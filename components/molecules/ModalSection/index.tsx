import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { OutlineBtn } from "../../atoms";
import { useTranslation } from "next-i18next";
import DATA from "../../../searchArray";
import { callbackify } from "util";
interface Props {
  onClose: any;
  closeOnOverlayClick: boolean;
  isOpen: boolean;
  name: string;

  filter: any;
  setfilter: any;
}

const ModalSection = ({
  onClose,
  closeOnOverlayClick,
  isOpen,
  name,

  filter,
  setfilter,
}: Props) => {
  const { t } = useTranslation();

  //only selected array case:
  const onSelect = (selectedValue: string, index: number) => {
    if (name === t("Job type / strength")) {
      if (filter.selectedJob.includes(selectedValue)) {
        // remove from selected array
        const remainingItems = filter.selectedJob.filter(
          (item: string, id: number) => {
            return item !== selectedValue;
          }
        );
        //filter is object{make sure changing job value does not hamper others values so...filter, and select to update exact value=>selectedJob:[] }
        setfilter({ ...filter, selectedJob: [...remainingItems] });
      } else {
        // else show the all selected array data
        setfilter({
          ...filter,
          selectedJob: [...filter.selectedJob, selectedValue],
        });
      }
    }
    if (name === t("Values")) {
      if (filter.selectedvalue.includes(selectedValue)) {
        const remainingItems = filter.selectedvalue.filter(
          (item: string, id: number) => {
            return item !== selectedValue;
          }
        );
        setfilter({ ...filter, selectedValue: [...remainingItems] });
      } else {
        setfilter({
          ...filter,
          selectedvalue: [...filter.selectedvalue, selectedValue],
        });
      }
    }
    if (name === t("Hobbies / favorite")) {
      if (filter.selctedhobbies.includes(selectedValue)) {
        const remainingItems = filter.selectedvalue.filter(
          (item: string, id: number) => {
            return item !== selectedValue;
          }
        );
        setfilter({ ...filter, selctedhobbies: [...remainingItems] });
      } else {
        setfilter({
          ...filter,
          selctedhobbies: [...filter.selctedhobbies, selectedValue],
        });
      }
    }
    // console.log(selectedvalue, "value");
  };

  const isPresent = (item: any) => {
    if (name === t("Job type / strength")) {
      return filter.selectedJob.includes(item);
    } else if (name === t("Values")) {
      return filter.selectedvalue.includes(item);
    } else {
      return filter.selctedhobbies.includes(item);
    }
  };
  // console.log("job", jobValue);
  return (
    <>
      <Modal
        closeOnOverlayClick={closeOnOverlayClick}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]  [&>div]:bg-[#E9E7DE] [&>div]:px-2 [&>div]:rounded-sm [&>div]:text-[12px] [&>div]:text-[#0C0C0C] [&>div]:leading-[25px] [&>div]:tracking-[0.3px]">
              {(name === t("Job type / strength")
                ? DATA.job_Values
                : name === t("Values")
                ? DATA.value_Values
                : DATA.hobbies_Values
              ).map((item: string, ind: number) => (
                <div
                  key={ind}
                  // store in array while select
                  onClick={() => onSelect(item, ind)}
                  className={`cursor-pointer ${
                    isPresent(item) ? "!bg-[#80722A] !text-white" : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-start gap-x-4">
            <OutlineBtn
              className="!text-[14px] !bg-[#80722A] [&>p]:text-white [&>p]:hover:text-[#80722A]"
              name="Explore"
            />
            <div onClick={onClose}>
              <OutlineBtn className="!text-[14px]" name="Cancel" />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { ModalSection };
