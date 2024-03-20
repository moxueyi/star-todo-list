export type base = {
    title: string,
    date: string,
    done: boolean,
}

export type todoType = {
    [id: number]: base
}