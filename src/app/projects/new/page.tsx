"use client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightUp,
  DragAndDropFileUpload,
  IconButton,
  MainLayout,
  ToolTip,
  CalendarIcon,
  Button,
  NumberedInputWrapper,
  FormInput,
  MoneyInput,
} from "@/components";
import Editor from "@/components/editor";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function NewProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  return (
    <MainLayout>
      <div className="space-y-5">
        {/* TAB */}
        <div>
          <div className="flex gap-3">
            <button
              className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${type === "fundraising" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() => router.push(`/projects/new?type=fundraising`)}
            >
              <span>Хандив олох төсөл</span>
            </button>
            <button
              className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${type === "grant_fundraising" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() =>
                router.push(`/projects/new?type=grant_fundraising`)
              }
            >
              <span>Хандив өгөх төсөл</span>
            </button>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Use flex-auto to allow a flex item to grow and shrink, taking into
            account its initial size:
          </p>
        </div>
        {/* HEADER */}
        <div className="bg-white border-2 rounded-2xl p-5 flex items-center gap-5">
          <IconButton icon={<ArrowLeft />} variant="outline-gray" />
          <p className="font-semibold text-lg">
            {type === "fundraising"
              ? "Хандив олох төсөл нэмэх"
              : "Хандив өгөх төсөл нэмэх "}
          </p>
          <ToolTip text="Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:, Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:" />
        </div>
        {/* GRANT FORM */}
        {type === "fundraising" ? (
          <FundraisingForm />
        ) : (
          <GrantFundraisingForm />
        )}
      </div>
    </MainLayout>
  );
}

export const GrantFundraisingForm = () => {
  return (
    <div className="space-y-3">
      {/* INPUT */}
      <NumberedInputWrapper number={1} label="Төслийн нэр">
        <FormInput name={"title"} placeHolder="Төслийн нэр" />
      </NumberedInputWrapper>
      <NumberedInputWrapper number={2} label="Линк">
        <FormInput
          name={"link"}
          placeHolder="Сонгон шалгаруулах форм линк оруулна уу"
        />
      </NumberedInputWrapper>
      {/* DRAG AND DROP */}
      <NumberedInputWrapper number={3} label="Зураг">
        <div className="flex">
          <div className="flex-auto text-center">
            <span className="text-gray-600 mb-2">Thumbnail харагдах зураг</span>
            <DragAndDropFileUpload />
          </div>
          <div className="flex-auto text-center">
            <span className="text-gray-600 mb-2">Cover | Дэлгэрнгүй зураг</span>
            <DragAndDropFileUpload />
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={4} label="Эхлэх болон дуусах хугацаа">
        <div className="flex">
          <div className="flex items-center px-2 py-1 gap-2 border">
            <input type="datetime-local" placeholder="Start date" />
            <ArrowRight color="#6b7280" />
            <input type="datetime-local" placeholder="End date" />
            <CalendarIcon color="#6b7280" />
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={5} label="Төслийн дэлгэрэнүй">
        <Editor data={"hi"} />
      </NumberedInputWrapper>
      <NumberedInputWrapper number={6} label="Холбоо барих">
        <div className="flex justify-between gap-5">
          <FormInput name="phoneNumber" placeHolder="Утас" />
          <FormInput name="email" placeHolder="Имэйл" />
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={7} label="Хянаж үзэх" isLast>
        <p className="text-md text-gray-600 mb-5">
          ОРУУЛСАН МЭДЭЭЛЛҮҮДЭЭ ШАЛГААРАЙ. БҮХ ХЭСГИЙГ ЗӨВ БӨГЛӨСӨН ТОХИОЛДОЛД
          ХҮЛЭЭЛГИЙН ГОРИМД ОРЖ НИЙТЛЭГДЭНЭ.
        </p>
        <div className="flex justify-end gap-3">
          <Button>Хүсэлт илгээх</Button>
          <Button variant="outline">Устгах</Button>
        </div>
      </NumberedInputWrapper>
    </div>
  );
};

export const FundraisingForm = () => {
  return (
    <div className="space-y-3">
      {/* INPUT */}
      <NumberedInputWrapper number={1} label="Төслийн нэр">
        <FormInput name={"title"} placeHolder="Төслийн нэр" />
      </NumberedInputWrapper>
      <NumberedInputWrapper number={2} label="Зорилго">
        <div className="flex justify-between gap-5">
          <div className="w-full">
            <p className="text-gray-600 text-sm">Хандивын зорилгот дүн</p>
            <MoneyInput
              value={2000}
              name={"goalAmount"}
              placeHolder="Хандивын зорилгот дүн"
            />
          </div>
          <div className="w-full">
            <p className="text-gray-600 text-sm">Одоогоор цугларсан байгаa</p>
            <MoneyInput
              value={2000}
              name={"currentAmount"}
              placeHolder="Одоогоор цугларсан байгаa"
            />
          </div>
        </div>
      </NumberedInputWrapper>
      {/* DRAG AND DROP */}
      <NumberedInputWrapper number={3} label="Зураг">
        <div className="flex">
          <div className="flex-auto text-center">
            <span className="text-gray-600 mb-2">Thumbnail харагдах зураг</span>
            <DragAndDropFileUpload />
          </div>
          <div className="flex-auto text-center">
            <span className="text-gray-600 mb-2">Cover | Дэлгэрнгүй зураг</span>
            <DragAndDropFileUpload />
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={4} label="Эхлэх болон дуусах хугацаа">
        <div className="flex">
          <div className="flex items-center px-2 py-1 gap-2 border">
            <input type="datetime-local" placeholder="Start date" />
            <ArrowRight color="#6b7280" />
            <input type="datetime-local" placeholder="End date" />
            <CalendarIcon color="#6b7280" />
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={5} label="Төслийн дэлгэрэнүй">
        <Editor data={"hi"} />
      </NumberedInputWrapper>
      <NumberedInputWrapper number={6} label="Холбоо барих">
        <div className="flex justify-between gap-5">
          <FormInput name="phoneNumber" placeHolder="Утас" />
          <FormInput name="email" placeHolder="Имэйл" />
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={7} label="Ангилал">
        <div className="flex flex-wrap gap-3">
          <button
            className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150
               ${true ? "border-none bg-primary-800 tracking-widest text-white font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
          >
            Category 1
          </button>
          <button
            className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150
               ${false ? "border-none bg-primary-800 tracking-widest text-white font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
          >
            Category 2
          </button>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={8} label="Хянаж үзэх" isLast>
        <p className="text-md text-gray-600 mb-5">
          ОРУУЛСАН МЭДЭЭЛЛҮҮДЭЭ ШАЛГААРАЙ. БҮХ ХЭСГИЙГ ЗӨВ БӨГЛӨСӨН ТОХИОЛДОЛД
          ХҮЛЭЭЛГИЙН ГОРИМД ОРЖ НИЙТЛЭГДЭНЭ.
        </p>
        <div className="flex justify-end gap-3">
          <Button>Хүсэлт илгээх</Button>
          <Button variant="outline">Устгах</Button>
        </div>
      </NumberedInputWrapper>
    </div>
  );
};
