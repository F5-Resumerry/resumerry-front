import MainButton from "components/atom/button/MainButton";
import NormalButton from "components/atom/button/NormalButton";
import FileIcon from "components/atom/icons/FileIcon";
import UpdateIcon from "components/atom/icons/UpdateIcon";
import Input from "components/atom/input";
import LabelInput from "components/atom/input/LabelInput";
import TextArea from "components/atom/textArea";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResumeType, ResumeWriteApiInput } from "util/api/resume";
import useGoBack from "util/hooks/goBack";
import { cls } from "util/utils";
import { CategoryKindType } from "../category/categoryValue";
import RegisterCategory from "../category/RegisterCategory";
import Hashtag from "./Hashtag";

type ResumeForm = ResumeWriteApiInput;

export default function ResumeForm({
  submitFunc,
  resume,
}: {
  isLoading: boolean;
  submitFunc: any;
  resume?: ResumeType;
}) {
  const goBack = useGoBack();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResumeForm>({ mode: "onSubmit" });

  const onValid = async (data: ResumeForm) => {
    submitFunc(data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    setValue("category", "IT");
    setValue("hashtagList", []);
    if (resume) {
      setValue("title", resume.title);
      setValue("category", resume.category as CategoryKindType);
      setValue("contents", resume.contents);
      setValue("years", resume.years);
      setValue("hashtagList", resume.hashtag);
    }
  }, [resume]);

  return (
    <div className={cls("lg:py-10 lg:bg-stone-100")}>
      <section
        className={cls(
          "w-full max-w-[50rem] m-auto px-4 py-5 bg-white",
          "sm:px-8 sm:py-10",
          "lg:rounded-3xl"
        )}
      >
        <form onSubmit={handleSubmit(onValid, onError)}>
          {/* title */}
          <header
            className={cls(
              "mb-5 flex flex-col items-start",
              "sm:flex-row sm:items-center sm:mb-10"
            )}
          >
            <Input
              color="main"
              inputSize="lg"
              placeholder="????????? ??????"
              register={register("title", { required: "????????? ???????????????." })}
              error={errors.title}
            />
            <div className={cls("basis-25 mt-3", "sm:ml-5 sm:mt-0")}>
              <LabelInput
                type="number"
                label="??????"
                block={false}
                placeholder="years"
                labelSize="lg"
                register={register("years", {
                  required: "????????? ?????? ?????? ????????????.",
                })}
              />
            </div>
          </header>
          <RegisterCategory
            value={watch().category}
            register={register("category")}
            format="write"
          />
          <TextArea
            label="????????? ??????"
            register={register("contents", {
              required: "?????? ????????? ???????????????.",
            })}
            textAreaHeight="sm"
            placeholder="????????? ?????? ????????? ???????????????"
            error={errors.contents}
          />
          <Hashtag
            hashtagList={watch().hashtagList}
            setValue={setValue}
            labelSize={"lg"}
          />
          <div className="flex space-x-8 items-center mb-2">
            <h3 className="text-deepBlack text-xl">????????? ?????????</h3>
            {watch().file && watch().file[0] && (
              <span className="text-deepPurple text-lg">
                {watch().file[0].name}
              </span>
            )}
          </div>
          <label
            className={cls(
              "w-[24rem] cursor-pointer text-lightBlack flex items-center justify-center border-2 border-dashed border-lightBlack h-24 rounded-md",
              "hover:border-deepPurple hover:text-deepPurple"
            )}
          >
            {watch().file && watch().file[0] ? <UpdateIcon /> : <FileIcon />}
            <input
              type="file"
              {...register("file")}
              className="hidden"
              accept=".pdf"
            />
          </label>
          <div className="flex justify-center space-x-5 mt-10">
            <NormalButton size="lg" color="normalColor" onClick={goBack}>
              ????????????
            </NormalButton>
            <MainButton size="lg" type="submit">
              ????????????
            </MainButton>
          </div>
        </form>
      </section>
    </div>
  );
}
