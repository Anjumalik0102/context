import styles from "@/styles/Home.module.css"
import { useContext } from "react";
import { SelectedCurrency } from "@/pages/_app";
export default function Navbar() {



    const { selectedCurrency, setSelectedCurrency } = useContext(SelectedCurrency);

    const CurrencyArray = [
        {
            Name: 'INR',
            Value: 1
        },
        {
            Name: 'Usd',
            Value: 0.012
        },
        {
            Name: 'Euro',
            Value: 0.011
        }
    ]

    function handleOnChange(event) {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const name = selectedOption.getAttribute('name');

        setSelectedCurrency({
            Name: name,
            Value: event.target.value
        })
    }

    return (
        <>
            <div className={styles.Navbar}>
                <label htmlFor="currency">Select a currency:</label>

                <select
                    id="currency"
                    name={selectedCurrency.Name}
                    onChange={handleOnChange}
                    value={selectedCurrency.Value}
                >

                    {
                        CurrencyArray.map((data, index) => {
                            return (
                                <option
                                    key={data.Name}
                                    name={data.Name}
                                    value={data.Value}
                                >

                                    {data.Name}

                                </option>
                            )
                        })
                    }


                </select>
            </div>
        </>
    )
}
