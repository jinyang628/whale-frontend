import { ApplicationContent } from "@/types/api/application/base";
import { atom } from "jotai";

export const applicationContentArr = atom<ApplicationContent[]>([]);
export const selectedApplications = atom<string[]>([]);
