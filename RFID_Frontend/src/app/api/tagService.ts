export interface Tag {
  id: number;
  epc: string;
  readerName: string;
  readerSerialNumber: string;  
  antennaPort: string;
  rssi: string;                
  timeOfRead: string;          
}

// Fonction utilitaire pour ajouter l'Authorization Bearer token
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export async function fetchTags(): Promise<Tag[]> {
  const response = await fetch("http://localhost:8080/tag/dto", {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve tags");
  }

  return response.json();
}

export async function fetchTagById(id: number): Promise<Tag> {
  const response = await fetch(`http://localhost:8080/tag/dto/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve tag with id ${id}`);
  }

  return response.json();
}

export async function fetchTagsByReader(readerName: string): Promise<Tag[]> {
  const response = await fetch(
    `http://localhost:8080/tag/dto/by-reader?readerName=${encodeURIComponent(readerName)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to retrieve tags for reader ${readerName}`);
  }

  return response.json();
}

export async function fetchTagByEpcAndAntenna(epc: string, antennaPort: string): Promise<Tag> {
  const response = await fetch(
    `http://localhost:8080/tag/dto/by-epc-antenna?epc=${encodeURIComponent(epc)}&antennaPort=${encodeURIComponent(antennaPort)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to retrieve tag with epc ${epc} and antenna ${antennaPort}`);
  }

  return response.json();
}

export async function createTag(tagData: Omit<Tag, "id">): Promise<Tag> {
  const response = await fetch("http://localhost:8080/tag/dto", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tagData),
  });

  if (!response.ok) {
    throw new Error("Failed to create tag");
  }

  return response.json();
}

export async function deleteTag(id: number): Promise<void> {
  const response = await fetch(`http://localhost:8080/tag/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete tag with id ${id}`);
  }
}

export const fetchAvailableTags = async (): Promise<Tag[]> => {
  const res = await fetch("http://localhost:8080/tag/available", {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error fetching available tags");
  return res.json();
};
