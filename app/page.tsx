import Link from 'next/link';

import { ShoeSection } from '@/components/home/shoes-section';
import { ClothesSection } from '@/components/home/clothes-section';
import { AccessoriesSection } from '@/components/home/accessories-section';


export default async function Home() {
    const shoes_arr = [
        {
            heading: "Sport Shoes Collection",
            description: "Hooper Gate have lot varieties of shoes where you can find your perfect shoes for running, basketball, football, etc",
            img: ["https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8a6ed2b4-2045-4379-9318-20a18e6753fc/custom-air-max-1-shoes-by-you.png", "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/26589075-f1e2-4297-861e-94686aa72325/KD17+EP.png", "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/560b0651-c9f1-44b3-9415-e1e417a015fd/JA+2+PREHEAT+EP.png"],
        }
    ]

    const clothes_arr = [
        {
            heading: "Clothes Collection",
            description: "Hooper Gate have lot varieties of clothes where you can find your perfect clothes for sportwears, daily wears, etc",
            img: ["https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/465c4a3c-7e96-4572-b2a2-ae3fe8d7b1dd/AS+M+NSW+AUTHRZD++PERSONNEL+TE.png", "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/20ea11cc-dd1a-438c-9a6b-c5480d3f7dc6/AS+M+NSW+LT+WT+WOVEN+JKT+GCEL.png", "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/5ffa42df-097c-4977-93ff-d4beb69624b4/AS+M+NSW+AUTHRZD++PERSONNEL+TE.png", "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/24ed5ffc-66af-4fc3-9f10-a1cdd1298d4a/M+NSW+TP+WVN+LS+SHIRT+UPF+RPL.png"],
        }
    ]

    const accessories_array = [
        {
            heading: "Accessories Collection",
            description: "Hooper Gate have lot varieties of accessories where you can find your perfect accessories for sportwears, daily wears, etc",
            img: ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9ca3c197-703d-4d89-a11c-f562afdf15ba/OFFLINE+OVERSIZE+BOUCLE+KNIT+B.png", "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/476842a9-f75a-4ea0-96c3-109b64c67a40/NK+NSW+RPM+BKPK+2.0.png", "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit", "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw519a918f/nk/599/a/9/d/3/d/599a9d3d_b9eb_45ac_8d50_38533f4664bb.jpg?sw=520&sh=520&sm=fit"],
        }
    ]

    return (
        <div className='container mx-auto '>
            <ShoeSection heading={shoes_arr[0].heading} description={shoes_arr[0].description} img={shoes_arr[0].img} />
            <ClothesSection heading={clothes_arr[0].heading} description={clothes_arr[0].description} img={clothes_arr[0].img} />
            <AccessoriesSection heading={accessories_array[0].heading} description={accessories_array[0].description} img={accessories_array[0].img} />
        </div>

    );
}
