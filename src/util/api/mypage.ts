import { CommonCUDResult } from "./common";
import client from "./client";
import { ScrapMypageSearchResult } from "./resume";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export interface TokenSearchApiResult {
  id: number;
  tokenCnt: number;
  reason: string;
  createdDate: string;
}

export interface ProfileApiResult {
  memberId: number;
  accountName: string;
  nickname: string;
  years: number;
  category: string;
  email: string;
  introduce: string;
  role: string;
  imageSrc: FileList;
  stack: number;
  token: number;
}

export interface Profiletype {
  nickname: string;
  years: number;
  category: string;
  email: string;
  isWorking: string;
  introduce: string;
  imageFile: string;
  stack: number;
  token: number;
}

export interface ProfileFixApiInput {
  nickname: string;
  years: number;
  category: string;
  isWorking: boolean;
  introduce: string;
  imageSrc: FileList;
  memberId: number;
}

export type ProfileFixApiResult = CommonCUDResult;

export const ProfileFixApi = (data: ProfileFixApiInput, userId: string) => {
  const formData = new FormData();
  formData.append("nickname", data.nickname);
  formData.append("years", data.years.toString());
  formData.append("category", data.category);
  formData.append("isWorking", "true");
  formData.append("introduce", data.introduce);
  formData.append("imageSrc", data.imageSrc[0]);
  formData.append("memberId", userId);
  // formData.append("hashtag", data.hashtag.toString());

  return client.put(`/my-page/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const ProfileMypageApi = (userId: string) =>
  client.get(`/my-page/${userId}`);

export type TokenListSearchApiResult = TokenSearchApiResult[];
export const TokenListSearchApi = (userId: string) =>
  client.get(`/my-page/token/${userId}`);

export type ScrapListMypageSearchResult = ScrapMypageSearchResult[];

export const ScrapListMypageSearchApi = (userId: string) =>
  client.get(`/my-page/${userId}/clip`);

export interface PaymentMypageApiResult {
  success: boolean;
  code: string;
  message: string;
  data: {
    payType: string;
    amount: number;
    orderId: string;
    orderName: string;
    clientName: string;
    clientEmail: string;
    successCallbackEndpoint: string;
    failCallbackEndpoint: string;
    createdDate: string;
    paySuccessYn: string;
    successYn: string;
    successUrl: string;
    failUrl: string;
  };
}

export interface PaymentMypageApiInput {
  nickname: string;
  email: string;
  //?????? ????????? ?????? ???????????? amount??? orderName????????? ???????????? ??????????????? ??????
}

export const PaymentMypageApi = (email: string, nickname: string) => {
  return client.post(
    `/orders?paySuccessYn=Y&payType=CARD&amount=7900&orderName=??????100???&clientEmail=${email}&clientName=${nickname}`
  );
};

export interface PaymentAcceptApiInput {
  orderId: string;
  paymentkey: string;
  amount: string;
  //?????? ????????? ?????? ???????????? amount??? orderName????????? ???????????? ??????????????? ??????
}

export const PaymentAcceptApi = (
  orderId: string,
  paymentkey: string,
  amount: string
) => {
  return client.get(
    `/orders/success?paymentKey=${paymentkey}&orderId=${orderId}&amount=${amount}`
  );
};
