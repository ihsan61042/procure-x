import { useState, useEffect } from "react";

const Create = (api: string, dataParams: unknown, Refreshkey: number) => {
  const [IsSuccess, setIsSuccess] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataParams),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsSuccess(true);
      }
    };

    fetchData();
  }, [api, Refreshkey]);

  return { IsSuccess, error };
};

export default Create;
