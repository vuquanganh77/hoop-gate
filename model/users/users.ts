import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function signUp({
    email,
    phone_number,
    username,
    hashedPassword,
}: {
    email: string;
    phone_number?: string;
    username: string;
    hashedPassword: string;
}) {
    try {
        // Create the user in the database
        const newUser = await db.users.create({
            data: {
                email,
                phone_number,
                username,
                password: hashedPassword,
                role: 0, // Default role set to 0
            },
        });
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
}


export async function signIn({ username, password }: { username: string; password: string }) {
    try {
        // Find the user by username
        const user = await db.users.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new Error("Invalid username or password");
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }

        // Return the user data without the password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error("Error in signIn:", error.message);
        throw error;
    }
}


export async function getUsersWithShipDetails() {
    // Step 1: Fetch all users
    const users = await db.users.findMany({
      select: {
        id: true,  // User ID
        username: true,
        email: true,
      },
    });
  
    // Step 2: Fetch ship details for each user
    const usersWithShipDetails = await Promise.all(
      users.map(async (user) => {
        const shipDetails = await db.ship_detail.findMany({
          where: {
            user_id: user.id,  // Match the user_id to the user's id
          },
          select: {
            name: true,
            phone: true,
            address: true,
          },
        });
  
        // Flatten the structure, using the first ship detail if available
        const shipDetail = shipDetails[0] || {};  // Use the first ship detail, or an empty object if none
  
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          name: shipDetail.name || null,
          phone: shipDetail.phone || null,
          address: shipDetail.address || null,
        };
      })
    );
  
    return usersWithShipDetails;
  }