import React, { createContext, useContext, useState } from "react";
import { Shoes } from "@/app/admin/shoes/columns";

interface ProductContextType {
    shoes: Shoes[];                          // State shoes
    setShoes: React.Dispatch<React.SetStateAction<Shoes[]>>;  // Hàm để cập nhật danh sách giày
    addShoes: (new_shoes: Shoes) => void;      // Hàm xóa giày theo ID
    editShoes: (edit_shoes: Shoes) => void;      // Hàm edit giày theo ID
    deleteShoes: (id: number) => void;      // Hàm xóa giày theo ID
}

const ShoesContext = createContext<ProductContextType | undefined>(undefined);


export const ShoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [shoes, setShoes] = useState<Shoes[]>([]);

    const deleteShoes = async (id: number) => {
        try {
            // Gọi API để thêm giày mới vào DB
            const response = await fetch('/api/shoes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}),
            });

            if (!response.ok) {
                throw new Error('Failed to delete shoes');
            }

            // Cập nhật state với giày mới
            setShoes((prevShoes) => prevShoes.filter((shoe) => { 
                if(shoe.id != id) {
                    return shoe;
                } console.log(shoe);
                
            }));

            
        } catch (error) {
            console.error('Error deleting shoes:', error);
        }
    };


    const addShoes = async (new_shoes: Shoes) => {
        try {
            // Gọi API để thêm giày mới vào DB
            const response = await fetch('/api/shoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_shoes),
            });

            if (!response.ok) {
                throw new Error('Failed to add new shoes');
            }

            const addedShoes = await response.json();

            // Cập nhật state với giày mới
            setShoes((prevShoes) => [...prevShoes, addedShoes]);
        } catch (error) {
            console.error('Error adding new shoes:', error);
        }
    }


    const editShoes = async (edited_shoes: Shoes) => {
        console.log("edited_shoes neê", edited_shoes);
        
        try {
            // Gọi API để edit giày trong DB
            const response = await fetch('/api/shoes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(edited_shoes),
            });

            if (!response.ok) {
                throw new Error('Failed to edit shoes');
            }

            // Cập nhật state với giày đã được chỉnh sửa
            setShoes((prevShoes) =>
                prevShoes.map((shoe) => (shoe.id === edited_shoes.id ? edited_shoes : shoe))
            );

        } catch(error) {
            console.error('Error editing shoes:', error);
        }
    }

    return (
        <ShoesContext.Provider value= {{ shoes, setShoes, addShoes, deleteShoes, editShoes }} >
            { children }
        </ShoesContext.Provider>
    );
  };


export const useShoesContext = (): ProductContextType => {
    const context = useContext(ShoesContext);
    if (!context) {
        throw new Error("useShoesContext must be used within a ShoesProvider");
    }
    return context;
};