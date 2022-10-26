import * as fs from "fs/promises";

type Data = {
    identifier: string; // identifier for the discord user (e.g joe#6942)
    points: number;
    threadLink: string;
    avatarURL: string;
}[];

let data: Data;

export const getData = async () => {
    if (!data) {
        data = JSON.parse(await fs.readFile("../data.json", "utf8")) as Data;
        return data;
    } else return data;
};

export const setData = async (newData) => {
    const stringified = JSON.stringify(newData);
    await fs.writeFile("../data.json", stringified, "utf8");

    data = newData;
};
