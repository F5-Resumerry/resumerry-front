import IconNumber from "components/atom/common/IconNumber";
import ChatIcon from "components/atom/icons/chatIcon/ChatIcon";
import ViewIcon from "components/atom/icons/chatIcon/ViewIcon";
import { cls } from "util/utils";

interface Props {
  category: string;
  commentCnt: number;
  viewCnt: number;
}

export default function SideInfo({ category, commentCnt, viewCnt }: Props) {
  return (
    <aside className={cls("hidden", "md:block md:relative md:basis-1/5")}>
      <div className="fixed top-52 space-y-3 pt-5 pb-2 px-2 bg-stone-100 rounded-2xl">
        <div className="text-black pt-1 pl-2">
          <h3 className="text-lightBlack">category</h3>
          <h5 className="text-xl">{category}</h5>
        </div>
        <div className="flex border-t-2 border-gray py-2 space-x-4">
          <IconNumber icon={<ChatIcon />} number={commentCnt} />
          <IconNumber icon={<ViewIcon />} number={viewCnt} />
        </div>
      </div>
    </aside>
  );
}
