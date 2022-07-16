import "stein-client";
import SteinStore, {
  Auth,
  DeleteOptions,
  EditOptions,
  ReadOptions,
} from "stein-js-client";

type Manage = Record<string, string | number>;

class Steins {
  private client: SteinStore;
  private authentication: Auth;

  constructor(apiId: string, authentication = {} as Auth) {
    this.authentication = authentication;
    this.client = new SteinStore(
      `https://api.steinhq.com/v1/storages/${apiId}`
    );
  }

  public create<D extends Manage>(sheetName: string, rows: D[]) {
    return this.client.append<D>(sheetName, rows, {
      authentication: this.authentication,
    });
  }

  public update<D extends Manage>(sheetName: string, options: EditOptions<D>) {
    return this.client.edit<D>(sheetName, {
      ...options,
      authentication: this.authentication,
    });
  }

  public delete<D extends Manage>(
    sheetName: string,
    options: DeleteOptions<D>
  ) {
    return this.client.delete<D>(sheetName, {
      ...options,
      authentication: this.authentication,
    });
  }

  public async get<D extends Record<string, string>>(
    sheetName: string,
    options?: ReadOptions
  ) {
    const response = await this.client.read(sheetName, {
      ...options,
      authentication: this.authentication,
    });
    return response.filter((data) => {
      const values = Object.values(data);
      return values.filter((value) => value !== null).length > 0;
    }) as D[];
  }

  public async getWithType<D extends object>(
    sheetName: string,
    options?: ReadOptions
  ): Promise<D[]> {
    const [typeResponse, response] = await Promise.all([
      this.getType(sheetName),
      this.get(sheetName, options),
    ]);

    return response.map((data) => {
      const keys = Object.keys(data);
      return keys.reduce((ret, key) => {
        const [type, delimiter] = typeResponse[key];
        const value = data[key];
        ret[key] = value;
        if (type === "array") ret[key] = value.split(delimiter);
        if (type === "number") ret[key] = parseFloat(value);
        if (type === "object") ret[key] = JSON.parse(value);
        return ret;
      }, {} as Record<string, unknown>) as D;
    });
  }

  private async getType(sheetName: string) {
    const response = await this.client.read(`${sheetName}Type`, {
      authentication: this.authentication,
    });
    return response.reduce((ret, { column, type, delimiter }) => {
      ret[column] = [type, delimiter];
      return ret;
    }, {} as Record<string, [type: string, delimiter: string]>);
  }
}

export default Steins;
