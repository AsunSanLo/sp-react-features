import { IIssue } from "./IIssue"

export const getIssues = (): Promise<Array<IIssue>> => {
  return new Promise(resolve => {
    resolve([
      {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        topic: "Oferta",
        status: "En curso"
      },
      {
        title: "Excepteur sint occaecat cupidatat non proident",
        topic: "Catálogo",
        status: "Nueva"
      },
      {
        title: "Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
        topic: "Precios",
        status: "En curso"
      },
      {
        title: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit",
        topic: "Oferta",
        status: "Completada"
      },
      {
        title: "vel illum qui dolorem eum fugiat ",
        topic: "Precios",
        status: "En curso"
      }
    ] as Array<IIssue>)
  })
}
