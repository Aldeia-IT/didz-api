export interface IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string>;
  uploadAndPinJson(json: any): Promise<string>;
  retrieveJson(cid: string): Promise<string>;
}
