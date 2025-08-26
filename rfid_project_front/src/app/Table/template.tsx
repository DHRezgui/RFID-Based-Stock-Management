"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface TableTemplateProps<T> {
  data: T[];
  searchKey?: keyof T;
  title: string;
  columnKeys: (keyof T)[];
  actionColumn?: TableColumn<T>;
  onUpdate?: (row: T) => void;
}

function TableTemplate<T extends { [key: string]: any }>({
  data,
  searchKey,
  title,
  columnKeys,
  actionColumn,
  onUpdate,
}: TableTemplateProps<T>) {
  const [records, setRecords] = useState<T[]>(data);

  useEffect(() => {
    setRecords(data);
  }, [data]);

  // Colonnes principales
  const columns: TableColumn<T>[] = columnKeys.map((key) => {
    if (key === "description") {
      return {
        name: "DESCRIPTION",
        sortable: true,
        cell: (row: T) => {
          const fullText = String(row[key]);
          const preview = fullText.length > 30 ? fullText.slice(0, 30) + "..." : fullText;
          return (
            <div
              title={fullText}
              style={{
                position: "relative",
                cursor: "help",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "250px",
              }}
            >
              {preview}
            </div>
          );
        },
      };
    }

    return {
      name: String(key).toUpperCase(),
      selector: (row: T) => row[key],
      sortable: true,
    };
  });

  // Colonne Update (si onUpdate est fourni)
  if (onUpdate) {
    columns.push({
      name: "ACTIONS",
      cell: (row: T) => (
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => onUpdate(row)}
        >
          Update
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  // Colonne supplémentaire d'action
  if (actionColumn) {
    columns.push(actionColumn);
  }

  // Filtrage
  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
    if (!searchKey) return;
    const query = event.target.value.toLowerCase();
    const filtered = data.filter((row) => {
      const val = row[searchKey];
      if (val === undefined || val === null) return false;
      return String(val).toLowerCase().includes(query);
    });
    setRecords(filtered);
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4 bg-white">
        <h2 className="text-center mb-4 text-secondary">{title}</h2>
        {searchKey && (
          <div className="text-end mb-3">
            <input
              type="text"
              placeholder={`Search by ${String(searchKey)}...`}
              className="form-control form-control-lg w-50 d-inline-block rounded-pill"
              onChange={handleFilter}
            />
          </div>
        )}
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: "#f5f7fa",
              },
            },
            rows: {
              style: {
                fontSize: "15px",
                minHeight: "55px",
              },
            },
            pagination: {
              style: {
                borderTop: "1px solid #e0e0e0",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default TableTemplate;
