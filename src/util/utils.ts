import axios, { AxiosError } from "axios";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
// 하나만 싹 지워주는구나

export function cls(...classnames: (string | undefined)[]) {
  return classnames.join(" ");
}

export function regExpression(
  regType: "regAccount" | "regPassword" | "regNickname"
): RegExp {
  const expression = {
    regAccount: /^[a-zA-Z0-9]{4,12}$/,
    regPassword:
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).{8,20}/,
    regNickname: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/,
  };

  return expression[regType];
}

export function groupBy(data: any[], key: string) {
  return data.reduce(function (carry: any, el: any) {
    var group = el[key];

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[group].push(el);
    return carry;
  }, {});
}

export interface ErrorObjectFromServer {
  field: string;
  message: string;
}

export interface ErrorFromServer {
  message: string;
  status: number;
  errors: ErrorObjectFromServer[];
  code: string;
}

export function axiosErrorHandling(
  err: AxiosError | Error,
  handlingFn: (a: any) => void
) {
  if (!axios.isAxiosError(err)) {
    console.log("not axios error");
    return;
  }

  if (err.response && err.response.data) {
    const errorData = err.response.data;
    if (errorData.errors && errorData.errors instanceof Array) {
      handlingFn(errorData.errors);
    } else {
      handlingFn([
        {
          field: "NotDefinedServerError",
          message: "서버에 에러가 발생했습니다.",
        },
      ]);
    }
  } else if (err.response) {
    console.log(err.response);
    handlingFn([
      {
        field: "NotDataBodyError",
        message: "에러 데이터가 없는 에러입니다.",
      },
    ]);
  } else if (err.request) {
    console.log(err.request);
    console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
  } else {
    console.log("Error", err.message);
  }
}
