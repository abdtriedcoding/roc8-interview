"use server";

import { db } from "~/server/db";
import { getSession } from "~/app/actions/auth";

export async function getAllCategories() {
  const session = await getSession();
  if (!session?.user) {
    return { error: "You must be logged in to manage interests" };
  }

  try {
    const userId = session.user.id;

    const categories = await db.category.findMany({
      include: {
        userInterests: {
          where: { userId },
          select: { categoryId: true },
        },
      },
    });

    return categories.map((category) => ({
      ...category,
      isChecked: category.userInterests.some(
        (interest) => interest.categoryId === category.id,
      ),
    }));
  } catch (error) {
    throw new Error("Something went wrong while fetching categories");
  }
}

export async function toggleInterest(categoryId: number) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "You must be logged in to manage interests" };
  }

  const user = session.user;

  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return { error: "Category not found" };
    }

    const existingInterest = await db.userInterest.findUnique({
      where: {
        categoryId_userId: {
          categoryId,
          userId: user.id,
        },
      },
    });

    if (existingInterest) {
      await db.userInterest.delete({
        where: {
          categoryId_userId: {
            categoryId,
            userId: user.id,
          },
        },
      });
    } else {
      await db.userInterest.create({
        data: {
          categoryId,
          userId: user.id,
        },
      });
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
