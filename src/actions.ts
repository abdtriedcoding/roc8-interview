"use server";

import { type Category } from "@prisma/client";
import { db } from "./server/db";
import { cookies } from "next/headers";
import { decodeAuthToken } from "~/lib/utils";
type CategoryWithInterestStatus = Category & { isInterested: boolean };

export async function getCurrentUser() {
  const token = cookies().get("Authorization");
  if (!token) {
    return null;
  }

  const email = decodeAuthToken(token.value);
  if (!email) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        interests: true,
      },
    });
    return { ...user, password: undefined };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function toggleInterest(id: number) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const category = await db.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isInterested = !!user?.interests?.filter(
    (interest) => interest.id === id,
  ).length;

  if (isInterested) {
    await db.user.update({
      where: { id: user?.id },
      data: { interests: { disconnect: { id } } },
    });
  } else {
    await db.user.update({
      where: { id: user?.id },
      data: { interests: { connect: { id } } },
    });
  }
}

export async function getAllCategoriesWithInterestStatus(
  pageNumber: number,
): Promise<CategoryWithInterestStatus[]> {
  const pageSize = 6;
  const user = await getCurrentUser();
  const categories = await db.category.findMany({
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
  const categoriesWithInterestStatus = categories.map((category) => {
    const isInterested = !!user?.interests?.filter(
      (interest) => interest.id === category.id,
    ).length;
    return { ...category, isInterested };
  });

  return categoriesWithInterestStatus;
}
