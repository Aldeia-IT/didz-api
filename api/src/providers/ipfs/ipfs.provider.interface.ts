export interface IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string>;
  uploadAndPinText(text: string): Promise<string>;
}
