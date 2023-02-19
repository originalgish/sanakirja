import { Client } from "@notionhq/client";

import { config } from "config";

import type { Block } from "types";

const notion = new Client({ auth: config.notion_api_key });

const fetchPaginatedData = async (databaseId: string, previousData: Block[], cursor?: string): Promise<Block[]> => {
  const newResponse = await notion.databases.query({ database_id: databaseId, start_cursor: cursor });
  const results = [...previousData, ...newResponse.results] as unknown as Block[];

  if (newResponse.has_more) {
    return fetchPaginatedData(databaseId, results, newResponse.next_cursor);
  }

  return results;
};

const notionApi = {
  async getAllWords() {
    try {
      const databaseId = "ef5aa5c4c7a74cefa36acf5cfee4e13b";

      return await fetchPaginatedData(databaseId, []);
    } catch (error) {
      console.error(error);
    }
  },
};

export const api = notionApi;
