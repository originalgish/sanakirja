import { Client } from "@notionhq/client";

import { config } from "config";

import type { Block } from "types";

const notion = new Client({ auth: config.notion_api_key });

const fetchPaginatedData = async (blockId: string, previousData: Block[], cursor?: string): Promise<Block[]> => {
  const newResponse = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor });
  const results = [...previousData, ...newResponse.results] as unknown as Block[];

  if (newResponse.has_more) {
    return fetchPaginatedData(blockId, results, newResponse.next_cursor);
  }

  return results;
};

const notionApi = {
  async getAllWords() {
    try {
      const blockId = "5dd7b73f0ac24a52aebe077dfab69512";

      return await fetchPaginatedData(blockId, []);
    } catch (error) {
      console.error(error);
    }
  },
};

export const api = notionApi;
