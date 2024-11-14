import { elasticClient } from "../../config/elastic-search";

export const BOOK_INDEX = 'books';  // Name for Elasticsearch index

export class ElasticService{
    async indexBook(book: any){
        await elasticClient.index({
          index: BOOK_INDEX,
          id: book.id.toString(),
          body: book
        });
      };
    async updateBookIndex(bookId: string, updatedBook: any){
        await elasticClient.update({
            index: BOOK_INDEX,
            id: bookId,
            body: {
              doc: updatedBook
            }
          });
      };
    async deleteBookIndex(bookId: string){
        await elasticClient.delete({
            index: BOOK_INDEX,
            id: bookId
          });
      };
}

