import prisma from "@/lib/client";

const ITEMS_PER_PAGE = 5;

export const getStudies = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const studies = await prisma.study.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return studies;
  } catch (error) {
    throw new Error("Failed to fetch study data");
  }
};

export const getStudiesForSelect = async () => {
  try {
    const studies = await prisma.study.findMany({
      orderBy: {
        id: "desc",
      },
      take: 20,
    });
    return studies;
  } catch (error) {
    throw new Error("Failed to fetch study data");
  }
};

export const getStudyById = async (sid: string) => {

  const id = Number(sid)

  try {
    const study = await prisma.study.findUnique({
      where: { id },
    });
    return study;
  } catch (error) {
    throw new Error("Failed to fetch study data");
  }
};

export const getStudyPages = async (query: string) => {
  try {
    const studies = await prisma.study.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(studies) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch study data");
  }
};