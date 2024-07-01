
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import { SelectedCurrency } from "@/pages/_app";
import { convertCurrency } from "@/commonFunction/convertCurrency";

export default function Product() {
    const { selectedCurrency, setSelectedCurrency } = useContext(SelectedCurrency);
    const price = 2000


    // function convertCurrency() {
    //     const newCurrency = price * selectedCurrency.Value
    //     console.log(newCurrency)
    // }

    return (
        <>
            <div className={styles.Product}>
                <div className={styles.card}>
                    product A = {convertCurrency(price,selectedCurrency.Value)}

                    <h1>{selectedCurrency.Name} or {selectedCurrency.Value}</h1>

                </div>
            </div>
        </>
    );
}
