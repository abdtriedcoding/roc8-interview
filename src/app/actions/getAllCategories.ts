"use server";

import { db } from "~/server/db";
import { getSession } from "~/app/actions/auth";

export async function getAllCategories() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("You must be logged in");
  }
  const userId = session.user.id;

  try {
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
