import { spawn } from 'child_process';

// npm command is different depending on OS
// https://github.com/nodejs/node/issues/3675
export const NPM_CMD = (process.platform == 'win32') ? 'npm.cmd' : 'npm';

/**
 * Represents a command to be executed in a dedicated process in node
 */
export class Command {

  cmd: string;
  args: Array<any>;
  data: string;

  constructor(command: string, argmts: Array<any>) {
    this.cmd = command;
    this.args = argmts;
    this.data = '';
  }

  /**
   * Execute the command and return a promise
   * containing the result of command execution as a JSON object
   */
  execute(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const process = spawn(this.cmd, this.args);
      process.stdout.on('data', (data: string) => {
        // Gather data output
        this.data = this.data + data;
      });
      process.on('close', (code: number) => {
        if (code == 0) {
          try {
            const res = JSON.parse(this.data);
            if (res.error != null) {
              reject(res);
            } else {
              resolve(res);
            }
          } catch(e) {
            reject(e);
          }
        } else {
          reject({
            error: {
              code,
              msg: 'command execution exited with code ' + code
            }
          });
        }
      });
    });
  }

  executeWitoutOutput(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const process = spawn(this.cmd, this.args);
      process.on('close', (code: number) => {
        if (code == 0) {
          resolve(code);
        } else {
          reject({
            error: {
              code,
              msg: 'command execution exited with code ' + code
            }
          });
        }
      });
    });
  }

}