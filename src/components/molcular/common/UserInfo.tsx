import { cls } from "util/utils";

const imageSizeValue = {
  sm: "w-6 h-6 sm:w-8 sm:h-8",
  md: "w-8 h-8 sm:w-10 sm:h-10",
};

const textSizeValue = {
  sm: "text-md",
  md: "text-lg",
};

interface Props {
  isAnonymous?: boolean;
  modifiedDate?: string;
  nickname: string | null;
  imageSrc: string | null;
  size?: "sm" | "md";
}

UserInfo.defaultProps = {
  isAnonymous: false,
  modifiedDate: "",
  size: "md",
};

export default function UserInfo({
  isAnonymous,
  modifiedDate,
  nickname,
  imageSrc,
  size,
}: Props) {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        {isAnonymous ? (
          <>
            <div
              className={cls(
                "bg-slate-300 rounded-full",
                imageSizeValue[size!]
              )}
            />
            <span className={cls("px-2 text-black", textSizeValue[size!])}>
              익명
            </span>
          </>
        ) : (
          <>
            {imageSrc ? (
              <img
                className={cls(
                  "rounded-full border border-stone-200",
                  imageSizeValue[size!]
                )}
                src={
                  "https://resumerry-user-profile-image.s3.ap-northeast-2.amazonaws.com" +
                  imageSrc!
                }
                alt="프로필"
              />
            ) : (
              <div
                className={cls(
                  "bg-slate-300 rounded-full",
                  imageSizeValue[size!]
                )}
              />
            )}
            <span className={cls("px-2 text-black", textSizeValue[size!])}>
              {nickname}
            </span>
          </>
        )}
      </div>
      {modifiedDate && (
        <div
          className={cls(
            "px-3 text-deepGray w-fit",
            size === "sm" ? "text-sm" : "text-md"
          )}
        >
          {modifiedDate.split("T")[0]}
        </div>
      )}
    </div>
  );
}
