"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import TableTemplate from "../Table/template";
import {
  fetchTags,
  createTag,
  deleteTag,
  Tag,
} from "../api/tagService";

function TagPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState<Omit<Tag, "id">>({
    epc: "",
    readerName: "",
    readerSerialNumber: "", 
    antennaPort: "",
    rssi: "",               
    timeOfRead: new Date().toISOString(), 
  });

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setLoading(true);
    try {
      const data = await fetchTags();
      setTags(data);
    } catch (error) {
      console.error("Error loading tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async () => {
    try {
      const created = await createTag(newTag);
      setTags([...tags, created]);
      setNewTag({
        epc: "",
        readerName: "",
        readerSerialNumber: "",
        antennaPort: "",
        rssi: "",
        timeOfRead: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTag(id);
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div
        className={`container-fluid text-center border border-black rounded-bottom-4 d-flex justify-between align-items-center px-4 py-2 ${styles.header}`}
      >
        <a
          href="https://www.uptech.com.tn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/logo1.png"
            alt="UPtech Logo"
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
        </a>

        <h1 className="m-0 flex-grow-1 text-center">Tags</h1>

        <a href="/" className="text-decoration-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#A8BFA0"
            className="bi bi-house-door"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0L1 7.793V14.5A1.5 1.5 0 0 0 2.5 16h4a.5.5 0 0 0 .5-.5V11a1 1 0 0 1 2 0v4.5a.5.5 0 0 0 .5.5h4A1.5 1.5 0 0 0 15 14.5V7.793l-6.646-6.647z" />
            <path d="M13 2.5V6l1 1V2.5a.5.5 0 0 0-1 0z" />
          </svg>
        </a>
      </div>

      <div className="container mt-4">
        <div className="mb-4">
          <h5 className="text-center">Add a Tag</h5>
          <div className="row">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="EPC"
              value={newTag.epc}
              onChange={(e) => setNewTag({ ...newTag, epc: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Reader Name"
              value={newTag.readerName}
              onChange={(e) =>
                setNewTag({ ...newTag, readerName: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Reader Serial Number"
              value={newTag.readerSerialNumber}
              onChange={(e) =>
                setNewTag({ ...newTag, readerSerialNumber: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Antenna Port"
              value={newTag.antennaPort}
              onChange={(e) =>
                setNewTag({ ...newTag, antennaPort: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="RSSI"
              value={newTag.rssi}
              onChange={(e) =>
                setNewTag({ ...newTag, rssi: e.target.value })
              }
            />
            <button onClick={handleAddTag} className="btn btn-success mt-2">
              ADD
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading tags...</p>
        ) : (
          <TableTemplate<Tag>
            data={tags}
            title="List of Tags"
            searchKey="readerName"
            columnKeys={[
              "epc",
              "readerName",
              "readerSerialNumber", 
              "antennaPort",
              "rssi",
              "timeOfRead",        
            ]}
            actionColumn={{
              name: "Action",
              cell: (row: Tag) => (
                <button
                  onClick={() => handleDelete(row.id)}
                  className="btn btn-sm btn-danger"
                >
                  DELETE
                </button>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TagPage;
