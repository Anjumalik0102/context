import React, { useState, useEffect, useRef } from 'react'
import { MdPlayCircleOutline } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import NewCreateProduct from '../../catalog/products/NewCreateProduct.js'
import config from '../../../config.js';
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import '../../../components/buttons/Buttons.css';
import { ImCross } from "react-icons/im";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { isDecimal, withdecimal } from '../../../config/withdecimal.js';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import '../../FormCss/allform.css';
import '../../catalog/products/Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faSquare,
    faPlus,
    faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { progressbar } from '../../../components/progress/progressbar.js';
import Getfetchapi from '../../getfetch.js'
import { PostFormFetchapi } from '../../postfetch.js';
import AuthConfig from '../../authmodule/AuthConfig';
import { AdminBaseCurrency } from '../../currency/AdminBaseCurrency.js';

export default function Createproduct() {
    const currencyData = JSON.parse(AuthConfig.currencyData)
    const [ProductType, setProductType] = useState('1')
    const [ProductName, setProductName] = useState('')
    const [Productcountry, setProductcountry] = useState('')
    const [Productslug, setProductslug] = useState('')
    const [CountrySlug, setCountrySlug] = useState('')
    const [ProductSKU, setProductSKU] = useState('')
    const [Productvendor, setProductvendor] = useState('')
    const [Productprice, setProductprice] = useState('')
    const [Productsaleprice, setProductsaleprice] = useState('')
    const [Vendorprice, setVendorprice] = useState('')
    const [VendorBasePrice, setVendorBasePrice] = useState('')
    const [CurrencySymbol, setCurrencySymbol] = useState('')
    const [Productstatus, setProductstatus] = useState(1)
    const [Displaymessagebox, setDisplaymessagebox] = useState(0)
    const [displayinputbox, setdisplayinputbox] = useState(0)
    const [DisplayImageUpload, setDisplayImageUpload] = useState(0)
    const [CalenderTag, setCalenderTag] = useState('')
    const [DaystoDeliver, setDaystoDeliver] = useState(0)
    const [Productgiftwrapper, setProductgiftwrapper] = useState(0)
    const [GiftwrapperVenderINRPrice, setGiftwrapperVenderINRPrice] = useState(0)
    const [GiftwrapperVenderBasePrice, setGiftwrapperVenderBasePrice] = useState(0)
    const [BestSeller, setBestSeller] = useState(0)
    const [SameDayDelivery, setSameDayDelivery] = useState(0)
    const [NewArrival, setNewArrival] = useState(0)
    const [OnTopArray, setOnTopArray] = useState([])
    const [TwoDayDel, setTwoDayDel] = useState(0)
    const [NextDayDel, setNextDayDel] = useState(0)
    const [ThreeHrDel, setThreeHrDel] = useState(0)
    const [PremiumDel, setPremiumDel] = useState(0)
    const [Pesonalized, setPesonalized] = useState(0)
    const [ProdSale, setProdSale] = useState(0)
    const [ShowOnTop, setShowOnTop] = useState(0)
    const [OnBottomArray, setOnBottomArray] = useState([])
    const [shortdescription, setshortdescription] = useState('')
    const [productdescription, setproductdescription] = useState('')
    const [challanshortDescription, setChallanshortDescription] = useState('')
    const [ChallanDescription, setChallanDescription] = useState('')
    const [proMetatitle, setproMetatitle] = useState('')
    const [ProductImage, setProductImage] = useState('')
    const [proimageUrl, setproimageUrl] = useState(null);
    const [OgTitle, setOgTitle] = useState('')
    const [imageOg, setimageOg] = useState('');
    const [imageOgUrl, setimageOgUrl] = useState(null);
    const [TwitterCard, setTwitterCard] = useState('')
    const [twitterimage, settwitterimage] = useState('');
    const [twitterimageUrl, settwitterimageUrl] = useState(null);
    const [TwitterTitle, setTwitterTitle] = useState('')
    const [proMetaDescription, setproMetaDescription] = useState('')
    const [proMetaKeywords, setproMetaKeywords] = useState('')
    const [OgDescription, setOgDescription] = useState('')
    const [TwitterDescription, setTwitterDescription] = useState('')

    const [SlectedProductAddons, setSlectedProductAddons] = useState([])
    const [SlectedProductAddonsIntial, setSlectedProductAddonsIntial] = useState(true)
    const [DeleveryLocationGroup, setDeleveryLocationGroup] = useState([])
    const [SlectedProductAttribute, setSlectedProductAttribute] = useState([])
    const [ProductCategory, setProductCategory] = useState([])
    const [relatedProductid, setrelatedProductid] = useState([])
    const [expanded, setExpanded] = useState([]);
    const [subMenuVisibility, setSubMenuVisibility] = useState({});
    const [activeButton, setActiveButton] = useState(1);



    // form fields error states
    const [errProductname, seterrProductname] = useState(false);
    const [errProductCountry, seterrProductCountry] = useState(false);
    const [errProductSlug, seterrProductSlug] = useState(false);
    const [errProductSKU, seterrProductSKU] = useState(false);
    const [errProductprice, seterrProductprice] = useState(false);
    const [errVendorprice, seterrVendorprice] = useState(false);
    const [errVendorbaseprice, seterrVendorbaseprice] = useState(false);
    const [errProductvendor, setErrProductvendor] = useState(false);
    let errAttribute = false
    let BaseCurrency = AdminBaseCurrency()
    /* product image desktop */

    const videoRef = useRef()

    const [DesktopImages, setDesktopImages] = useState([
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        }
    ]);

    /* product image mobile */

    const [MobileImages, setMobileImages] = useState([
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
         
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
          
        },
        {
            ImageUrl: '',
            type: '',
            ImageFile: '',
           
        }
    ]);


    const [VariationFormValues, setVariationFormValues] = useState([])

    const handleproshortDescription = (editorContent) => setshortdescription(editorContent)
    const handleproDescription = (editorContent) => setproductdescription(editorContent)
    const handleChallanshortDescription = (editorContent) => setChallanshortDescription(editorContent)
    const handleproChallanDescription = (editorContent) => setChallanDescription(editorContent)

    const [AllVendors, setAllVendors] = useState([])
    const [countries, setCountries] = useState([]);
    const [AllAddons, setAllAddons] = useState([])
    const [AllAttributes, setAllAttributes] = useState([])
    const [AllCategory, setAllCategory] = useState([])
    const [AllCalenderTag, setAllCalenderTag] = useState([])
    const [AllProductsCountryWise, setAllProductsCountryWise] = useState([])
    const [AllDeliveryLocations, setAllDeliveryLocations] = useState([])
    const [apifetch, setApifetch] = useState(true);

    useEffect(() => {
        getAllcountries()
        getattributes()
        getAllCalenderTag()
        getAllDeliveryLocations()
    }, [])

    useEffect(() => {
        getvendors()
        if (!SlectedProductAddonsIntial) {
            setSlectedProductAddons([])
        }
        if (Productvendor) {
            getAddons()
            setSlectedProductAddonsIntial(false)
        }
    }, [Productvendor])

    useEffect(() => {
        if (Productcountry) {
            getAllCategory()
            getAllProductsCountryWise()
        }
    }, [Productcountry])

    async function getvendors() {
        let url = `${config.apipath}vendors/getallvendors`;
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllVendors(data.result);
            AllVendors.map((item) => {
                if (Productvendor == item.VendorId) {
                    setCurrencySymbol(item.CurrencySymbol)
                }
            })
        };
    }

    async function getAllcountries() {
        let url = config.apipath + 'country/getcountries'
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setCountries(data.result)
        };
    }

    async function getAddons() {
        let url = config.apipath + 'addons/adonsbyvenderid/' + Productvendor
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllAddons(data.result)
        };
    }

    async function getattributes() {
        let url = config.apipath + 'attributes/getallactiveattributesanditems'
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllAttributes(data.result)
            const initialSubMenuVisibility = {};
            let firstAttributeArray = []
            data.result.forEach((item) => {
                initialSubMenuVisibility[item[0].parentmenuname] = true;
                let firstAttribute = {}
                item[1].submenus.map((items, index) => {
                    if (index === 0) {
                        firstAttribute = {
                            'AttributeItemId': items.AttributeItemId,
                            'attributePrice': '',
                            'VenderINRPrice': '',
                            'VenderBasePrice': '',
                            'AttributeNo': items.AttributeNo,
                            'IsDefault': 1,
                            'attributePriceIsValid': false,
                            'VenderINRPriceIsValid': false,
                            'VenderBasePriceIsValid': false
                        };

                        firstAttributeArray.push(firstAttribute)
                    }
                });
            });
            setSlectedProductAttribute(firstAttributeArray)
            setSubMenuVisibility(initialSubMenuVisibility);
        };
    }

    async function getAllCategory() {
        let url = config.apipath + 'categories/countrywisecategories/' + Productcountry;
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllCategory(data.result)
        };
    }

    async function getAllCalenderTag() {
        let url = config.apipath + 'masters/allcalendertags';
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllCalenderTag(data.result)
        };
    }

    async function getAllProductsCountryWise() {
        let url = config.apipath + 'products/countryallproducts/' + Productcountry;
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllProductsCountryWise(data.result)
        };
    }

    async function getAllDeliveryLocations() {
        let url = config.apipath + 'deliverlocations/getalldeliverylocation'
        let data = await Getfetchapi(url)
        if (data.CODE == 500) {
            toast(data.error)
        } else {
            setAllDeliveryLocations(data.result)
        };
    }

    let handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleCheck = (checked) => {
        setProductCategory(checked);
    };

    const handleExpand = (expanded) => {
        setExpanded(expanded);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...VariationFormValues];
        newFormValues.splice(i, 1);
        setVariationFormValues(newFormValues)
    }

    function getProductName(e) {
        setProductName(e.target.value)
        seterrProductname(false)
    }

    function getProductslug(e) {
        setProductslug(e.target.value)
        seterrProductSlug(false)
    }

    function getProductSKU(e) {
        setProductSKU(e.target.value)
        seterrProductSKU(false)
    }

    function getProductprice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setProductprice(inputValue)
            seterrProductprice(false)
        }
    }

    function getProductsaleprice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setProductsaleprice(inputValue)
            seterrProductprice(false)
        }
    }

    function getVendorprice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setVendorprice(inputValue);
            seterrVendorprice(false)
        }
    }

    function getVendorBasePrice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setVendorBasePrice(inputValue);
            seterrVendorbaseprice(false)
        }
    }

    function getProductvendor(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setProductvendor(inputValue);
            setErrProductvendor(false)
        }
    }

    function getGiftwrapper(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setProductgiftwrapper(inputValue);
        }
    }

    function getGiftwrapperVenderINRPrice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setGiftwrapperVenderINRPrice(inputValue);
        }
    }

    function getGiftwrapperVenderBasePrice(e) {
        let inputValue = e.target.value
        const decimalRegex = withdecimal(isDecimal)
        if (decimalRegex.test(inputValue) || inputValue === '') {
            setGiftwrapperVenderBasePrice(inputValue);
        }
    }

    function getProductcountry(e) {
        setProductcountry(e.target.value)
        const selectedOption = e.target.options[e.target.selectedIndex];
        const countrySlug = selectedOption.getAttribute('country_slug');
        setCountrySlug(countrySlug)
        seterrProductCountry(false)
    }

    function getDisplayPincodeBox(e) {
        const value = e.target.value;
        setdisplayinputbox(value);
    }

    // Variation functions

    let addFormFields = () => {
        if (VariationFormValues.length < 1) {
            setVariationFormValues([...VariationFormValues, { variation_sku: '', variation_title: "", variation_price: '', variation_vendor_price: '', variation_vendor_base_price: '', variation_status: '1', variation_image: '', previewimageurl: '', newimage: false, errvariation: false, IsDefault: 1 }])
        } else {
            setVariationFormValues([...VariationFormValues, { variation_sku: '', variation_title: "", variation_price: '', variation_vendor_price: '', variation_vendor_base_price: '', variation_status: '1', variation_image: '', previewimageurl: '', newimage: false, errvariation: false, IsDefault: 0 }])
        }
    }

    function getvariationSKU(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_sku = value;
        setVariationFormValues(newFormValues);
    }

    function getvariationTitle(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_title = value;
        setVariationFormValues(newFormValues);
    }

    function getIsDefault(e, index) {
        let value = e.target.checked
        if (value) {
            let newFormValues = [...VariationFormValues];
            newFormValues = newFormValues.map((attr, ind) => ({
                ...attr,
                IsDefault: ind === index ? 1 : 0
            }));

            setVariationFormValues(newFormValues);
        }
    }

    function getvariationprice(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_price = value;
        setVariationFormValues(newFormValues);
    }

    function getVariationvendorprice(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_vendor_price = value;
        setVariationFormValues(newFormValues);
    }

    function getVariationvendorbaseprice(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_vendor_base_price = value;
        setVariationFormValues(newFormValues);
    }

    function getvariationstatus(e, index) {
        let value = e.target.value
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_status = value;
        setVariationFormValues(newFormValues);
    }

    function imageSelect(e, index) {
        let newFormValues = [...VariationFormValues];
        newFormValues[index].variation_image = e.target.files[0];
        newFormValues[index].previewimageurl = URL.createObjectURL(e.target.files[0]);

        newFormValues[index].newimage = true;
        setVariationFormValues(newFormValues);
    }

    const variationValidations = () => {
        return new Promise((resolve, reject) => {
            VariationFormValues.map((vals, inds) => {
                if (!vals.variation_sku || !vals.variation_title || !vals.variation_price || !vals.variation_vendor_price || !vals.variation_vendor_base_price || !vals.previewimageurl) {
                    let newFormValues = [...VariationFormValues];
                    newFormValues[inds].errvariation = true;
                    setVariationFormValues(newFormValues);
                    resolve(true)
                } else {
                    let newFormValues = [...VariationFormValues];
                    newFormValues[inds].errvariation = false;
                    setVariationFormValues(newFormValues);
                }
            })
            resolve(false)
        })
    }

    // End Variation Functions

    async function addonSelect(e) {
        let checked = e.target.checked;
        let roleValue = e.target.value;
        let oldarray = [...SlectedProductAddons];
        let mk = [];
        const results = oldarray.filter(value => { return value !== roleValue });
        if (checked) {
            mk = [...SlectedProductAddons, roleValue];
            setSlectedProductAddons(mk)
        } else {
            setSlectedProductAddons(results)
        }
    }

    async function DeliveryLocationSelect(e) {
        let checked = e.target.checked;
        let roleValue = e.target.value;
        let oldarray = [...DeleveryLocationGroup];
        let mk = [];
        const results = oldarray.filter(value => { return value !== roleValue });
        if (checked) {
            mk = [...DeleveryLocationGroup, roleValue];
            setDeleveryLocationGroup(mk)
        } else {
            setDeleveryLocationGroup(results)
        }
    }

    const toggleSubMenu = (parentMenu) => {
        setSubMenuVisibility(prevState => ({
            ...prevState,
            [parentMenu]: !prevState[parentMenu]
        }));
    };

    async function setAttribute(e, AttributeItemId, AttributeNo, attributeName) {
        const value = e.target.value;
        let updatedAttributes = [...SlectedProductAttribute];
        errAttribute = false
        const decimalRegex = withdecimal(isDecimal)
        let numericValueCheck = decimalRegex.test(value) || value === ''
        if (numericValueCheck || attributeName === 'IsDefault') {
            // console.log(1)
            // Update the IsDefault attribute
            // if (attributeName === 'IsDefault') {
            //     console.log(2)
            //     updatedAttributes = updatedAttributes.map(attr => ({
            //         ...attr,
            //         IsDefault: attr.AttributeNo === AttributeNo ? (attr.AttributeItemId === AttributeItemId ? 1 : 0) : attr.IsDefault
            //     }));
            // } else {
            // console.log(3)
            const existingAttributeIndex = updatedAttributes.findIndex(attr => attr.AttributeItemId === AttributeItemId);

            let updatedAttribute;

            // if ((value !== '' && value !== null) || attributeName === 'IsDefault') {
            // console.log(4)
            updatedAttribute = {
                'AttributeItemId': AttributeItemId,
                'attributePrice': attributeName === 'attributePrice' ? value : SlectedProductAttribute.find(attr => attr.AttributeItemId === AttributeItemId)?.attributePrice || '',
                'VenderINRPrice': attributeName === 'VenderINRPrice' ? value : SlectedProductAttribute.find(attr => attr.AttributeItemId === AttributeItemId)?.VenderINRPrice || '',
                'VenderBasePrice': attributeName === 'VenderBasePrice' ? value : SlectedProductAttribute.find(attr => attr.AttributeItemId === AttributeItemId)?.VenderBasePrice || '',
                'AttributeNo': AttributeNo,
                'IsDefault': attributeName === 'IsDefault' ? 1 : SlectedProductAttribute.find(attr => attr.AttributeItemId === AttributeItemId)?.IsDefault || 0,
                'attributePriceIsValid': false,
                'VenderINRPriceIsValid': false,
                'VenderBasePriceIsValid': false
            };
            // } 
            // else {
            //     // console.log(5)
            //     updatedAttribute = { 'AttributeItemId': AttributeItemId, 'attributePrice': '', 'VenderINRPrice': '', 'VenderBasePrice': '', 'AttributeNo': AttributeNo, 'IsDefault': 0, 'attributePriceIsValid': false, 'VenderINRPriceIsValid': false, 'VenderBasePriceIsValid': false };
            // }

            if (existingAttributeIndex !== -1) {
                // console.log(6)
                updatedAttributes[existingAttributeIndex] = updatedAttribute;
                updatedAttributes = updatedAttributes.map(attr => ({
                    ...attr,
                    IsDefault: attr.AttributeNo === AttributeNo ? (attr.AttributeItemId === AttributeItemId ? 1 : 0) : attr.IsDefault
                }));
            } else {
                // console.log(7)
                updatedAttributes.push(updatedAttribute);
                updatedAttributes = updatedAttributes.map(attr => ({
                    ...attr,
                    IsDefault: attr.AttributeNo === AttributeNo ? (attr.AttributeItemId === AttributeItemId ? 1 : 0) : attr.IsDefault
                }));
            }
            // }
        }

        setSlectedProductAttribute(updatedAttributes);
    }

    async function FuntionsetBestSeller(e) {
        if (OnTopArray.length < 2) {
            if (e.target.checked) {
                setBestSeller(1);
                setOnTopArray([...OnTopArray, 1])
            } else {
                setBestSeller(0);
                const filteredValue = OnTopArray.filter(value => { return value !== 1 });
                setOnTopArray(filteredValue)
            }
        } else {
            setBestSeller(0);
            const filteredValue = OnTopArray.filter(value => { return value !== 1 });
            setOnTopArray(filteredValue)
        }
    }

    async function FuntionsetSameDayDelivery(e) {
        if (OnTopArray.length < 2) {
            if (e.target.checked) {
                setSameDayDelivery(1);
                setOnTopArray([...OnTopArray, 2])
            } else {
                setSameDayDelivery(0);
                let filteredValue = OnTopArray.filter(value => { return value !== 2 })
                setOnTopArray(filteredValue)
            }
        } else {
            setSameDayDelivery(0);
            let filteredValue = OnTopArray.filter(value => { return value !== 2 })
            setOnTopArray(filteredValue)
        }
    }

    async function FuntionsetNewArrival(e) {
        if (OnTopArray.length < 2) {
            if (e.target.checked) {
                setNewArrival(1);
                setOnTopArray([...OnTopArray, 3])
            } else {
                setNewArrival(0);
                let filteredValue = OnTopArray.filter(value => { return value !== 3 })
                setOnTopArray(filteredValue)
            }
        } else {
            setNewArrival(0);
            let filteredValue = OnTopArray.filter(value => { return value !== 3 })
            setOnTopArray(filteredValue)
        }
    }

    async function FuntionsetTwoDayDel(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setTwoDayDel(1);
                setOnBottomArray([...OnBottomArray, 1])
            } else {
                setTwoDayDel(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 1 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setTwoDayDel(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 1 })
            setOnBottomArray(filteredValue)
        }

    }

    async function FuntionsetNextDayDel(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setNextDayDel(1);
                setOnBottomArray([...OnBottomArray, 2])
            } else {
                setNextDayDel(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 2 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setNextDayDel(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 2 })
            setOnBottomArray(filteredValue)
        }
    }

    async function FuntionsetThreeHrDel(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setThreeHrDel(1);
                setOnBottomArray([...OnBottomArray, 3])
            } else {
                setThreeHrDel(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 3 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setThreeHrDel(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 3 })
            setOnBottomArray(filteredValue)
        }
    }

    async function FuntionsetPremiumDel(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setPremiumDel(1);
                setOnBottomArray([...OnBottomArray, 4])
            } else {
                setPremiumDel(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 4 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setPremiumDel(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 4 })
            setOnBottomArray(filteredValue)
        }
    }

    async function FuntionsetPesonalized(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setPesonalized(1);
                setOnBottomArray([...OnBottomArray, 5])
            } else {
                setPesonalized(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 5 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setPesonalized(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 5 })
            setOnBottomArray(filteredValue)
        }
    }

    async function FuntionsetProdSale(e) {
        if (OnBottomArray.length < 3) {
            if (e.target.checked) {
                setProdSale(1);
                setOnBottomArray([...OnBottomArray, 6])
            } else {
                setProdSale(0);
                let filteredValue = OnBottomArray.filter(value => { return value !== 6 })
                setOnBottomArray(filteredValue)
            }
        } else {
            setProdSale(0);
            let filteredValue = OnBottomArray.filter(value => { return value !== 6 })
            setOnBottomArray(filteredValue)
        }
    }


    // const handlePlayClick = () => {
    //     if (videoRef.current) {
    //         videoRef.current.play();

    // };
    const handleFileChange = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(index, file);
        }
    };

    const handleFile = (index, file) => {
        console.log(index, file)
        const newImages = [...DesktopImages];
        newImages[index] = {
            ...newImages[index],
            ImageFile: file,
            ImageUrl: URL.createObjectURL(file),
            type: file.type.startsWith('image') ? 'image' : 'video',
        };

        if (file.type.startsWith('image')) {
            newImages[index].ImageUrl = URL.createObjectURL(file);
        } else if (file.type.startsWith('video')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newImages[index].ImageUrl = e.target.result;
                setDesktopImages(newImages);
            };
            reader.readAsDataURL(file);
        }

        console.log('newImages', newImages)

        setDesktopImages(newImages);
    };


    // const handleFileChange = (index) => (e) => {
    //     const file = e.target.files[0].type;

    //     handleFile(index, file);
    // };


    // const handleFile = (index, file) => {
    //     const newImages = [...DesktopImages]
    //     newImages[index]['ImageUrl'] = URL.createObjectURL(file);
    //     newImages[index]['ImageFile'] = file;
    //     setDesktopImages(newImages);
    // };
    // const handleVideoClick = () => {
    //     if (videoRef.current) {
    //         if (videoRef.current.paused) {
    //             videoRef.current.play();


    //         } else {
    //             videoRef.current.pause();

    //         }
    //     }
    // };


    
 
    const [a, setA] = useState(true);
    const[b,setB]=useState(false)
   
    const videoRefs = useRef(DesktopImages.map(() => React.createRef()));

    const handleVideoClickPlay = (index) => {
        const videoRef = videoRefs.current[index].current;
        if (videoRef) {
            videoRef.play();
            setA(false); 
            setB(true); 
        }
    };
    const handleVideoClickPause = (index) => {
        const videoRef = videoRefs.current[index].current;
        if (videoRef) {
            videoRef.pause();
            setA(true); 
            setB(false); 
        }
    };
  





    const handleDragStart = (index) => (e) => {
        e.dataTransfer.setData("index", index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("index");
        if (draggedIndex !== "" && draggedIndex !== index.toString()) {
            const newImages = [...DesktopImages];
            const temp = newImages[index];
            newImages[index] = newImages[draggedIndex];
            newImages[draggedIndex] = temp;
            setDesktopImages(newImages);
        }
    };

    const handleFileChangeMobile = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileMobile(index, file);
        }

    };
    const handleFileMobile = (index, file) => {
        const newImages = [...MobileImages];
        newImages[index] = {
            ...newImages[index],
            ImageFile: file,
            ImageUrl: URL.createObjectURL(file),
            type: file.type.startsWith('image') ? 'image' : 'video',
        };

        if (file.type.startsWith('image')) {
            newImages[index].ImageUrl = URL.createObjectURL(file);
        } else if (file.type.startsWith('video')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newImages[index].ImageUrl = e.target.result;
                setMobileImages(newImages);
            };
            reader.readAsDataURL(file);
        }

        setMobileImages(newImages);
    };


    // const handleFileMobile = (index, file) => {
    //     const newImages = [...MobileImages]
    //     newImages[index]['ImageUrl'] = URL.createObjectURL(file);
    //     newImages[index]['ImageFile'] = file;
    //     setMobileImages(newImages);
    // };

    const handleDragStartMobile = (index) => (e) => {
        e.dataTransfer.setData("index", index);
    };

    const handleDropMobile = (e, index) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("index");
        if (draggedIndex !== "" && draggedIndex !== index.toString()) {
            const newImages = [...MobileImages];
            const temp = newImages[index];
            newImages[index] = newImages[draggedIndex];
            newImages[draggedIndex] = temp;
            setMobileImages(newImages);
        }
    };

    function getprodictid(e, ProductId) {
        let checked = e.target.checked
        if (checked) {
            setrelatedProductid([...relatedProductid, ProductId])
        } else {
            let filteredProductid = relatedProductid.filter(item => item !== ProductId);
            setrelatedProductid(filteredProductid)
        }
    }

    const productsCol = [
        {
            headerName: '', field: '', sortable: true, filter: false, width: '100px',
            cellRenderer: (data) => {
                return (
                    <input type='checkbox' checked={relatedProductid.includes(data.data.ProductId)} onClick={(e) => getprodictid(e, data.data.ProductId)} />
                );
            },
        },

        { headerName: 'Name', field: 'ProductName', sortable: true, filter: true, resizable: true, cellStyle: { color: '#206ddc' } },
        { headerName: 'SKU', field: 'ProductSku', sortable: true, filter: true, resizable: true },
        {
            headerName: 'Price', field: 'ProductPrice', sortable: true, filter: true, resizable: true, width: '150px',
            cellRenderer: (data) => {
                const priceInRupees = `${BaseCurrency.admincurrncySymbol}${data.data.ProductPrice}`;
                return priceInRupees;
            }, cellStyle: { textAlign: "right" },
        },
        {
            headerName: 'Sale Price', field: 'ProductSalePrice', sortable: true, filter: true, resizable: true, width: '150px',
            cellRenderer: (data) => {
                const priceInRupees = `${BaseCurrency.admincurrncySymbol}${data.data.ProductSalePrice}`;
                return priceInRupees;
            }, cellStyle: { textAlign: "right" }
        },
    ];

    async function checkAttributeError() {
        return new Promise((resolve, reject) => {
            if (SlectedProductAttribute.length > 0) {
                let hasError = false;
                const updatedAttributes = SlectedProductAttribute.map((attribute) => {
                    if ((attribute.VenderBasePrice) && !(attribute.VenderINRPrice) && !(attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, attributePriceIsValid: true, VenderINRPriceIsValid: true };
                    } else if (!(attribute.VenderBasePrice) && (attribute.VenderINRPrice) && !(attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, attributePriceIsValid: true, VenderBasePriceIsValid: true };
                    } else if (!(attribute.VenderBasePrice) && !(attribute.VenderINRPrice) && (attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, VenderINRPriceIsValid: true, VenderBasePriceIsValid: true };
                    } else if (!(attribute.VenderBasePrice) && (attribute.VenderINRPrice) && (attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, VenderBasePriceIsValid: true };
                    } else if ((attribute.VenderBasePrice) && !(attribute.VenderINRPrice) && (attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, VenderINRPriceIsValid: true };
                    } else if ((attribute.VenderBasePrice) && (attribute.VenderINRPrice) && !(attribute.attributePrice)) {
                        hasError = true;
                        return { ...attribute, attributePriceIsValid: true };
                    }
                    return attribute;
                });

                setSlectedProductAttribute(updatedAttributes);
                resolve(hasError);
            } else {
                resolve(false);
            }
        });
    }

    async function CreateProduct(e) {
        e.preventDefault();
        errAttribute = await checkAttributeError()
        if (!ProductName) {
            setActiveButton(1)
            seterrProductname(true);
            return false;
        }
        else if (!ProductSKU) {
            setActiveButton(1)
            seterrProductSKU(true);
            return false;
        }
        else if (!Productcountry) {
            setActiveButton(1)
            seterrProductCountry(true);
            return false;
        }
        else if (!Productslug) {
            setActiveButton(1)
            seterrProductSlug(true);
            return false;
        }
        else if (!Productvendor) {
            setActiveButton(1)
            setErrProductvendor(true);
            return false;
        }
        else if (!Productprice) {
            setActiveButton(1)
            seterrProductprice(true);
            return false;
        }
        else if (!Vendorprice) {
            setActiveButton(1)
            seterrVendorprice(true);
            return false;
        }
        else if (!VendorBasePrice) {
            setActiveButton(1)
            seterrVendorbaseprice(true);
            return false;
        }
        else if (ProductCategory.length < 1) {
            setActiveButton(2)
            return false;
        }
        else if (!DesktopImages[0].ImageUrl) {
            setActiveButton(6)
            // DesktopImages[0].ImgdesktopErr = true;
            return false;
        }
        else if (!MobileImages[0].ImageUrl) {
            setActiveButton(6)
            // DesktopImages[0].ImgdesktopErr = true;
            return false;
        }
        else if (errAttribute) {
            setActiveButton(7)
            return false;
        }

        else {
            let variationvalid = await variationValidations();
            if (variationvalid) {
                console.log(12)
                return false;
            }

            if (apifetch) {
                setApifetch(false)
                progressbar.start()
                let Data = new FormData();
                Data.append('ProductType', ProductType)
                Data.append("ProductName", ProductName)
                Data.append("ProductSKU", ProductSKU)
                Data.append('ProductCountry', Productcountry);
                Data.append("Productslug", CountrySlug + '/' + Productslug)
                Data.append("Productvendor", Productvendor)
                Data.append("Productstatus", Productstatus)
                Data.append("Productprice", Productprice)
                Data.append("Productsaleprice", Productsaleprice)
                Data.append('ProductDisplayGiftwrapper', Productgiftwrapper);
                Data.append('GiftwrapperVenderINRPrice', GiftwrapperVenderINRPrice);
                Data.append('GiftwrapperVenderBasePrice', GiftwrapperVenderBasePrice);
                Data.append('VendorPrice', Vendorprice)
                Data.append('VendorBasePrice', VendorBasePrice)
                Data.append('DisplayMessageBox', Displaymessagebox);
                Data.append('displayinputbox', displayinputbox);
                Data.append('DisplayImageUpload', DisplayImageUpload);
                Data.append('CalenderTag', CalenderTag);
                Data.append('DaystoDeliver', DaystoDeliver);
                Data.append('ProductBestSeller', BestSeller);
                Data.append('ProductSameDayDelivery', SameDayDelivery);
                Data.append('ProductNewArrival', NewArrival);
                Data.append('TwoDayDelivery', TwoDayDel);
                Data.append('NextDayDelivery', NextDayDel);
                Data.append('ThreeHourDelivery', ThreeHrDel);
                Data.append('PremiumDelivery', PremiumDel);
                Data.append('ProductPersonalised', Pesonalized);
                Data.append('ProductSale', ProdSale);
                Data.append('ShowOnTop', ShowOnTop);
                Data.append('ProductShortDescription', shortdescription);
                Data.append('productdescription', productdescription);
                Data.append('challanshortDescription', challanshortDescription);
                Data.append('ChallanDescription', ChallanDescription);
                Data.append('ProductCategory', ProductCategory);
                Data.append("ProductMetatitle", proMetatitle)
                Data.append("ProductImage", ProductImage)
                Data.append("ProductOgtitle", OgTitle)
                Data.append("ImageOg", imageOg)
                Data.append("ProductTwitterCard", TwitterCard)
                Data.append("Twitterimage", twitterimage)
                Data.append("ProductTwitterTitle", TwitterTitle)
                Data.append("ProductMetaDesc", proMetaDescription)
                Data.append("ProductMetaKeywords", proMetaKeywords)
                Data.append("ProductOgDescription", OgDescription)
                Data.append("ProductTwitterDescription", TwitterDescription)
                Data.append("ProductAddons", SlectedProductAddons)
                Data.append("DeleveryLocationGroup", DeleveryLocationGroup)
                Data.append("VariationFormValues", JSON.stringify(VariationFormValues))
                Data.append("relatedProductid", relatedProductid)

                DesktopImages.forEach((desktopimage, index) => {
                    Object.keys(desktopimage).forEach((key) => {
                        Data.append(`DesktopImages` + index, desktopimage[key]);
                    });
                });

                MobileImages.forEach((mobileimage, index) => {
                    Object.keys(mobileimage).forEach((key) => {
                        Data.append(`MobileImages` + index, mobileimage[key]);
                    });
                });

                SlectedProductAttribute.forEach((attribute, index) => {
                    Object.keys(attribute).forEach((key) => {
                        Data.append(`SlectedProductAttribute[${index}][${key}]`, attribute[key]);
                    });
                });

                if (VariationFormValues) {
                    VariationFormValues.map((data, index) => {
                        if (data.variation_image) {
                            Data.append('VariationImages' + index, data.variation_image)
                        }
                    })
                }

                let url = config.apipath + 'products/create';
                let data = await PostFormFetchapi(url, Data)
                setApifetch(true)
                if (data.CODE == 500) {
                    toast.error(data.error)
                } else {
                    toast("Product Created successfully")
                    setProductType("1")
                    setProductName('')
                    setProductslug('')
                    setCountrySlug('')
                    setProductSKU('')
                    setProductvendor('')
                    setProductprice('')
                    setProductsaleprice('')
                    setVendorprice('')
                    setVendorBasePrice('')
                    setProductstatus(1)
                    setProductcountry('')
                    setDisplaymessagebox(0)
                    setdisplayinputbox('')
                    setDisplayImageUpload(0)
                    setCalenderTag('')
                    setDaystoDeliver('')
                    setProductgiftwrapper('')
                    setGiftwrapperVenderINRPrice('')
                    setGiftwrapperVenderBasePrice('')
                    setBestSeller(0)
                    setSameDayDelivery(0)
                    setNewArrival(0)
                    setTwoDayDel(0)
                    setNextDayDel(0)
                    setThreeHrDel(0)
                    setPremiumDel(0)
                    setPesonalized(0)
                    setProdSale(0)
                    setShowOnTop(0)
                    setshortdescription('')
                    setproductdescription('')
                    setChallanshortDescription('')
                    setChallanDescription('')
                    setproMetatitle('')
                    setProductImage('')
                    setproimageUrl(null)
                    setOgTitle('')
                    setimageOg('')
                    setimageOgUrl(null)
                    setTwitterCard('')
                    settwitterimage('')
                    settwitterimageUrl(null)
                    setTwitterTitle('')
                    setproMetaDescription('')
                    setproMetaKeywords('')
                    setOgDescription('')
                    setTwitterDescription('')
                    setSlectedProductAddons([])
                    setSlectedProductAddonsIntial(true)
                    setDeleveryLocationGroup([])
                    setSlectedProductAttribute([])
                    setProductCategory([])
                    setrelatedProductid([])
                    setExpanded([])
                    setSubMenuVisibility({})
                    setActiveButton(1)
                    setDesktopImages([
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        }
                    ])
                    setMobileImages([
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        },
                        {
                            ImageUrl: '',
                            ImageFile: ''
                        }
                    ])
                    setVariationFormValues([])
                    setAllCategory([])
                    setAllProductsCountryWise([])
                }
            }
        }
    }

    return (
        <>
            <div className="">
                <div className="d-flex Edit_button bg-white justify-content-end" style={{ paddingRight: "12px" }} onContextMenu={(e) => e.preventDefault()}>
                    <div className="BtnCreate mt-2 mb-2" type="submit" onClick={(e) => CreateProduct(e)} > Create </div>
                    <div className='mt-2'>
                        <div>
                            <Link to={`/products`}>
                                <button className="close_icon"><IoReturnUpBackSharp /></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ewr-container customClass d-flex flex-column page-content justify-content-between bg-white row" onContextMenu={(e) => e.preventDefault()}>
                <div className="card-invoice bg-white p-0">
                    <div className="card-body12 row">
                        <div className="col-md-12 bg-white p-0">
                            <div className="d-flex flex-column page-content row mb-2" style={{}} onContextMenu={(e) => e.preventDefault()}>
                                <div className="container-product p-0">
                                    <div className="container-fluid custom_fluidcon bg-white">
                                        <div className="buttonsGrp pt-2">
                                            <button className={activeButton === 1 ? 'btnactive pe-2 ps-2' : 'pe-3 ps-3'}
                                                onClick={() => setActiveButton(1)}
                                            > General Information
                                            </button>

                                            <button className={activeButton === 9 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(9)}
                                            > Description </button>

                                            <button className={activeButton === 2 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(2)}
                                            > Product Categories </button>

                                            <button className={activeButton === 3 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(3)}
                                            > SEO Content </button>

                                            <button className={activeButton === 4 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(4)}
                                            > Addons </button>

                                            {displayinputbox == "1" &&
                                                <button className={activeButton === 5 ? 'btnactive pe-2 pe-2' : 'pe-2 pe-2'}
                                                    onClick={() => setActiveButton(5)}
                                                >  Delivery Location </button>
                                            }
                                            <button className={activeButton === 6 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(6)}
                                            > Product Images </button>

                                            <button className={activeButton === 7 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(7)}
                                            >  Attributes </button>

                                            {/* <button className={activeButton === 8 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                    onClick={() => setActiveButton(8)}
                                                >  Variation </button> */}

                                            {ProductType == '2' ?
                                                <button
                                                    className={activeButton === 8 ? "btnactive pe-2 ps-2" : "pe-2 ps-2"}
                                                    onClick={() => setActiveButton(8)}
                                                >
                                                    Variable
                                                </button>

                                                :

                                                <>
                                                </>
                                            }

                                            <button className={activeButton === 10 ? 'btnactive pe-2 ps-2' : 'pe-2 ps-2'}
                                                onClick={() => setActiveButton(10)}
                                            >Related Products </button>

                                        </div>
                                        {/* general info starts*/}
                                        {activeButton === 1 &&
                                            <div className="contenttab_general mt-3">
                                                <div className='generalinfowrapper'>
                                                    <div className="generalinfowrapper-body mt-4 bg-white d-flex ">
                                                        <div className=''>
                                                            {/* <label className="form_label wrapingColor fw-bold mt-1">Product:</label> */}
                                                            <div className="row">
                                                                <div className="col-md-2 p-0">
                                                                    <label className="form_label"> Type </label>
                                                                    <select className="form-control box-size selectinputrap mb-2" name="Addonstatus" onChange={(e) => setProductType(e.target.value)} value={ProductType} >
                                                                        <option value="1">Simple</option>
                                                                        <option value="2">Variable</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-6"><label className="form_label">Name*</label>
                                                                    <input type="text" className={'form-control' + (errProductname ? ' inputerrors' : '')}
                                                                        onChange={(e) => getProductName(e)} value={ProductName} />
                                                                </div>
                                                                <div className="col-md-4"><label className="form_label">SKU*</label>
                                                                    <input type=" text" className={'form-control' + (errProductSKU ? ' inputerrors' : '')} onChange={(e) => getProductSKU(e)} value={ProductSKU}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-2 p-0">
                                                                    <label className="form_label">Country*</label>
                                                                    <select className={'form-control' + (errProductCountry ? ' inputerrors' : '')} name="Addonstatus" onChange={(e) => getProductcountry(e)} value={Productcountry} >
                                                                        <option value="" country_slug=''>-- Select --</option>
                                                                        {countries.map((item, index) => {
                                                                            return (
                                                                                <option country_slug={item.CountrySlug} value={item.CountryId} key={index}>{item.CountryName}</option>

                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>

                                                                <div className="col-md-2" ><label className="form_label">Slug*</label>
                                                                    <input type=" text" className='form-control' value={CountrySlug} />
                                                                </div>
                                                                <div className="col-md-1" style={{ width: "0.333%" }}><label className="form_label p-0"></label><p>/</p>
                                                                </div>
                                                                <div className="col-md-3" style={{ width: "31%" }}><label className="form_label"></label>
                                                                    <input type=" text" className={'form-control' + (errProductSlug ? ' inputerrors' : '')} onChange={(e) => getProductslug(e)} value={Productslug} />
                                                                </div>

                                                                <div className="col-md-2">
                                                                    <label className="form_label">Vendor Product*</label>
                                                                    <select className={'form-control' + (errProductvendor ? ' inputerrors' : '')} name="Addonstatus" onChange={(e) => getProductvendor(e)} value={Productvendor} >
                                                                        <option value="">-- Select --</option>
                                                                        {AllVendors.map((item, index) => {
                                                                            return (
                                                                                <option value={item.VendorId} key={index} >{item.StoreName}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-1 pe-0" style={{ width: "15.333%" }}>
                                                                    <label className="form_label">Status </label>
                                                                    <select className="ew-inputRole form-control box-size" name="Addonstatus" onChange={(e) => setProductstatus(e.target.value)} value={Productstatus} >
                                                                        <option value="1">Active</option>
                                                                        <option value="0">In-Active</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className=''>
                                                                <fieldset className="field_set mt-2">
                                                                    <legend className='fieldsetFont'> Pricing </legend>
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <label className="form_label">Price*</label>
                                                                            <input type="text" className={'form-control' + (errProductprice ? ' inputerrors' : '')} onChange={(e) => getProductprice(e)} value={Productprice} placeholder='0.00'
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-2"><label className="form_label">Sale Price </label>
                                                                            <input type="text" className="form-control" onChange={(e) => getProductsaleprice(e)} value={Productsaleprice} placeholder='0.00'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-6  mt-2'>
                                                                            <label className="form_label wrapingColor fw-bold mt-1 p-0">Vendor</label>
                                                                            <div className="row pb-2 mt-1">
                                                                                <div className="col-md-4 p-0">
                                                                                    <label className="form_label">{BaseCurrency.adminLabel} price*</label>
                                                                                    <input type="text" className={'form-control' + (errVendorprice ? ' inputerrors' : '')} onChange={(e) => getVendorprice(e)} value={Vendorprice} placeholder='0.00'
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-6"><label className="form_label">Base price({CurrencySymbol})* </label>
                                                                                    <input type="text" className={'form-control' + (errVendorbaseprice ? ' inputerrors' : '')} onChange={(e) => getVendorBasePrice(e)} value={VendorBasePrice} placeholder='0.00'
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6 seprator_Div mt-2'>
                                                                            <label className="form_label wrapingColor fw-bold mt-1">Gift Wrapping</label>
                                                                            <div className="row pb-2 mt-1">
                                                                                <div className="col-md-3 p-0"><label className="form_label ">Charges</label>
                                                                                    <input type="text" className="form-control" onChange={(e) => getGiftwrapper(e)} value={Productgiftwrapper} placeholder='0.00' />
                                                                                </div>
                                                                                <div className="col-md-4"><label className="form_label">Vendor {BaseCurrency.adminLabel}</label>
                                                                                    <input type="text" className="form-control" onChange={(e) => getGiftwrapperVenderINRPrice(e)} value={GiftwrapperVenderINRPrice} placeholder='0.00' />
                                                                                </div>
                                                                                <div className="col-md-5"><label className="form_label">Vendor Base({CurrencySymbol})</label>
                                                                                    <input type="text" className="form-control" onChange={(e) => getGiftwrapperVenderBasePrice(e)} value={GiftwrapperVenderBasePrice} placeholder='0.00' />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </fieldset>
                                                                <div className='mt-2'>
                                                                    <fieldset className="field_set mt-2 mb-1">
                                                                        <legend className='fieldsetFont'> Others</legend>
                                                                        <div className='row'>
                                                                            <div className='col-md-12 ms-2 mb-1 pt-2 mb-1 ps-0'>
                                                                                <div className="w-100 row pb-2">
                                                                                    <div className="addressline1 col-md-3"><label className="form_label">Delivery Location Box</label>
                                                                                        <select className='form-control' name="Addonstatus" onChange={(e) => getDisplayPincodeBox(e)} value={displayinputbox}>
                                                                                            <option value="0">No</option>
                                                                                            <option value="1">Yes</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="addressline1 col-md-2 p-0"><label className="form_label">Message Box</label>
                                                                                        <select className="ew-inputRole form-control box-size" name="Addonstatus" onChange={(e) => setDisplaymessagebox(e.target.value)} value={Displaymessagebox} >
                                                                                            <option value="1">Yes</option>
                                                                                            <option value="0">No</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="addressline1 col-md-2"><label className="form_label">Image Upload</label>
                                                                                        <select className="ew-inputRole form-control box-size" name="Addonstatus" onChange={(e) => setDisplayImageUpload(e.target.value)} value={DisplayImageUpload} >
                                                                                            <option value="1">Yes</option>
                                                                                            <option value="0">No</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="addressline1 col-md-3"><label className="form_label">Calender Tag</label>
                                                                                        <select className="ew-inputRole form-control box-size" name="Addonstatus" onChange={(e) => setCalenderTag(e.target.value)} value={CalenderTag} >
                                                                                            <option value=''>--Select--</option>
                                                                                            {AllCalenderTag.map((item, ind) => {
                                                                                                return (
                                                                                                    <option value={item.CalenderTagId} key={ind}>{item.CalenderTagName}</option>

                                                                                                )
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="Disableday col-md-2" style={{ width: "15%", textAlign: "end" }} ><label className="form_label">Days to Deliver</label>
                                                                                        <input type="text"
                                                                                            className="form-control text-end"
                                                                                            placeholder='0'
                                                                                            onChange={(e) => setDaystoDeliver(e.target.value)}
                                                                                            value={DaystoDeliver}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <fieldset className='col-md-4 rowleft mb-1 me-1 pt-2 ms-3 ps-4 field_set' style={{ width: "25%" }}>
                                                            <legend className='fieldsetFont'>Tags</legend>
                                                            <div className="address  pb-2 FlexDiv">
                                                                <div className='productchkbxsec '>
                                                                    <label className='form_label fw-bold mt-3 '>On Top</label>
                                                                    <div className="addressline1 prochk1 mt-2">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetBestSeller(e) }} value={BestSeller} checked={BestSeller === 1} />
                                                                        <label className='form_label ms-2'>Best Seller</label>
                                                                    </div>
                                                                    <div className="addressline1 prochk2">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetSameDayDelivery(e) }} value={SameDayDelivery} checked={SameDayDelivery === 1} />
                                                                        <label className='form_label ms-2'>Same Day Delivery</label>
                                                                    </div>

                                                                    <div className="addressline1 prochk3">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetNewArrival(e) }} value={NewArrival} checked={NewArrival === 1} />
                                                                        <label className='form_label ms-2'>New Arrival</label>
                                                                    </div>
                                                                </div>

                                                                <div className='productchkbxsec mt-4'>
                                                                    <label className='form_label fw-bold mt-2'>On Bottom</label>
                                                                    <div className="addressline1 mt-2 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetTwoDayDel(e) }} value={TwoDayDel} checked={TwoDayDel === 1} />
                                                                        <label className='form_label ms-2'>Two Day Delivery</label>
                                                                    </div>

                                                                    <div className="addressline1 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetNextDayDel(e) }} value={NextDayDel} checked={NextDayDel === 1} />
                                                                        <label className='form_label ms-2'>Next Day Delivery</label>
                                                                    </div>
                                                                    <div className="addressline1 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetThreeHrDel(e) }} value={ThreeHrDel} checked={ThreeHrDel === 1} />
                                                                        <label className='form_label ms-2'>3 Hour Delivery</label>
                                                                    </div>

                                                                    <div className="addressline1 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetPremiumDel(e) }} value={PremiumDel} checked={PremiumDel === 1} />
                                                                        <label className='form_label ms-2'>Premium Delivery</label>
                                                                    </div>

                                                                    <div className="addressline1 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetPesonalized(e) }} value={Pesonalized} checked={Pesonalized === 1} />
                                                                        <label className='form_label ms-2'>Product Personalised</label>
                                                                    </div>

                                                                    <div className="addressline1 ">
                                                                        <input type='checkbox' name="Addonstatus" onChange={(e) => { FuntionsetProdSale(e) }} value={ProdSale} checked={ProdSale === 1} />
                                                                        <label className='form_label ms-2'>Product Sale</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>

                                                    </div>
                                                </div>
                                            </div>}

                                        {/* general info ends */}

                                        {/* product categories start */}
                                        {(activeButton === 2 && Productcountry) ?
                                            <div className="product-form mt-4">
                                                <div className='addressline1 mt-4 col-md-3 ms-4'>
                                                    <label className="form_label"> Product Categories </label>
                                                    <CheckboxTree
                                                        nodes={AllCategory}
                                                        checked={ProductCategory}
                                                        expanded={expanded}
                                                        onCheck={handleCheck}
                                                        onExpand={handleExpand}
                                                        noCascade={true}
                                                        icons={{
                                                            check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheck} />,
                                                            uncheck: <FontAwesomeIcon className="checkbox-input" icon={faSquare} style={{ fill: "none", stroke: "currentColor", strokeWidth: "2px" }} />,
                                                            halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheck} />,
                                                            expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faPlus} />,
                                                            expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faMinus} />,
                                                            expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faPlus} />,
                                                            collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faMinus} />,
                                                            parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon='' />,
                                                            parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon='' />,
                                                            leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            : (activeButton === 2 && !Productcountry) ? <div className='stylingproductcat fw-bolder mt-5 pt-3' > Select Country</div> : ''}
                                        {/* product categories ends */}

                                        {/* seo content starts */}
                                        {activeButton === 3 &&
                                            <div className="product-form mt-4">
                                                <div className='generalinfowrapper'>
                                                    <div className="generalinfowrapper-body row">
                                                        <div className='col-md-6 rowleft'>
                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-6"><label className="form_label">Product Meta Title</label>
                                                                    <input type=" text" name="username" className="form-control" onChange={(e) => setproMetatitle(e.target.value)} value={proMetatitle}
                                                                    />
                                                                </div>

                                                                <div className="addressline2 col-md-6"><label className="form_label">Product Image</label>
                                                                    <div className='wrap_image'>
                                                                        <label htmlFor="catImageDesktop" className="custom-file-upload">
                                                                            Choose File
                                                                        </label>
                                                                        <input id="catImageDesktop" type="file" className="form-control ew-inputRole box-size node_image" style={{ display: 'none' }} onChange={(e) => { setProductImage(e.target.files[0]); setproimageUrl(URL.createObjectURL(e.target.files[0])) }} />
                                                                        {(proimageUrl) ?
                                                                            <>
                                                                                <img width={100} className='ms-2' src={proimageUrl} alt=" " loading="lazy" />
                                                                            </>
                                                                            :
                                                                            ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-6"><label className="form_label">Product OG Title</label>
                                                                    <input type=" text" className="form-control" onChange={(e) => setOgTitle(e.target.value)} value={OgTitle} />
                                                                </div>

                                                                <div className="addressline2 col-md-6"><label className="form_label"> Product OG Image</label>
                                                                    <div className='wrap_image'>
                                                                        <label htmlFor="catImageDesktop1" className="custom-file-upload">
                                                                            Choose File
                                                                        </label>
                                                                        <input id="catImageDesktop1" type="file" className=" fileuploadinput Firstname form-control ew-inputRole box-size node_image" style={{ display: 'none' }} onChange={(e) => { setimageOg(e.target.files[0]); setimageOgUrl(URL.createObjectURL(e.target.files[0])) }} />
                                                                        {(imageOgUrl) ?
                                                                            <>
                                                                                <img className='ms-2' width={100} src={imageOgUrl} loading="lazy" />
                                                                            </>
                                                                            :
                                                                            ''

                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-6"><label className="form_label">Product Twitter Card</label>
                                                                    <input type=" text" name="username" className="form-control" onChange={(e) => setTwitterCard(e.target.value)} value={TwitterCard} />
                                                                </div>

                                                                <div className="addressline2 col-md-6"><label className="form_label">Product Twitter Image</label>
                                                                    <div className='wrap_image'>
                                                                        <label htmlFor="catImageDesktop2" className="custom-file-upload">
                                                                            Choose File
                                                                        </label>
                                                                        <input id="catImageDesktop2" type="file" name="username" className=" Firstname form-control ew-inputRole box-size node_image" style={{ display: 'none' }} onChange={(e) => { settwitterimage(e.target.files[0]); settwitterimageUrl(URL.createObjectURL(e.target.files[0])) }} />
                                                                        {(twitterimageUrl) ?
                                                                            <>
                                                                                <img className='ms-2' width={100} src={twitterimageUrl} loading="lazy" />
                                                                            </>
                                                                            :
                                                                            ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-6"><label className="form_label">product Twitter Title</label>
                                                                    <input type=" text" name="username" className="form-control" onChange={(e) => setTwitterTitle(e.target.value)} value={TwitterTitle} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6 rowright'>
                                                            <div className=" address row w-100">
                                                                <div className="addressline1 col-md-12"><label className="form_label">Product Meta Description</label>
                                                                    <textarea className="form-control seopro" id="exampleFormControlTextarea12" rows="10" onChange={(e) => setproMetaDescription(e.target.value)} value={proMetaDescription}></textarea>
                                                                </div>
                                                            </div>

                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-12"><label className="form_label">Product Meta Keywords</label>
                                                                    <textarea className="form-control seopro" id="exampleFormControlTextarea12" rows="10" onChange={(e) => setproMetaKeywords(e.target.value)} value={proMetaKeywords}></textarea>
                                                                </div>
                                                            </div>

                                                            <div className=" address row  w-100">
                                                                <div className="addressline1 col-md-12"><label className="form_label">Product OG Description</label>
                                                                    <textarea className="form-control productdesc seopro" id="exampleFormControlTextarea12" rows="10" onChange={(e) => setOgDescription(e.target.value)} value={OgDescription}></textarea>

                                                                </div>
                                                            </div>

                                                            <div className=" address row w-100 mb-5">
                                                                <div className="addressline1 col-md-12"><label className="form_label">Product Twitter Description</label>
                                                                    <textarea className="form-control productdesc seopro" id="exampleFormControlTextarea12" rows="10" onChange={(e) => setTwitterDescription(e.target.value)} value={TwitterDescription}></textarea>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        }
                                        {/* seo content ends     */}

                                        {/* select addons content starts */}
                                        {(activeButton === 4 && Productvendor && (AllAddons.length > 0)) ?
                                            <div className="product-form mt-4 mb-4">
                                                <div className='generalinfowrapper'>
                                                    <div className="generalinfowrapper-body row">
                                                        {AllAddons && AllAddons.map((item, ind) => {
                                                            return (
                                                                <>
                                                                    <div className='proaddonswrap col-md-4 ' >
                                                                        <div className='proaddonckbx'>
                                                                            <div>
                                                                                <input type="checkbox"
                                                                                    className="mt-1 mb-1 ps-31 checkbox-input tick-icon"
                                                                                    value={item.AddonId}
                                                                                    onChange={addonSelect}
                                                                                    checked={SlectedProductAddons.includes(item.AddonId.toString())} />
                                                                            </div>
                                                                        </div>
                                                                        <div className='proaddonnames'>
                                                                            <span>{item.AddonName} {item.AddonSku}</span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            : (activeButton === 4 && Productvendor && (AllAddons.length < 1)) ?
                                                <div className='stylingproductcat fw-bolder' > No addon for this vendor</div>
                                                : (activeButton === 4) ?
                                                    <div className='stylingproductcat fw-bolder ' > Select Vendor</div>
                                                    : ''
                                        }
                                        {/* select addons content ends */}

                                        {/* group pincode content starts */}
                                        {(activeButton === 5 && (AllDeliveryLocations.length > 0)) ?
                                            <div className="product-form mt-4 mb-4">
                                                <div className='generalinfowrapper'>
                                                    <div className="generalinfowrapper-body row">
                                                        {AllDeliveryLocations && AllDeliveryLocations.map((item, ind) => {
                                                            return (
                                                                <div className='proaddonswrap col-md-4 ' key={ind} >
                                                                    <div className='proaddonckbx'>
                                                                        <div>
                                                                            <input type="checkbox"
                                                                                className="mt-1 mb-1 ps-31 checkbox-input tick-icon"
                                                                                value={item.DeliveryLocationGroupId}
                                                                                onChange={DeliveryLocationSelect}
                                                                                checked={DeleveryLocationGroup.includes(item.DeliveryLocationGroupId.toString())} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='proaddonnames'>
                                                                        <span>{item.DeliveryLocationGroupname}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            : (activeButton === 5 && (AllDeliveryLocations.length < 1)) ?
                                                <div className='stylingproductcat fw-bolder' > No Delivery Location Group Available </div>
                                                : ''
                                        }
                                        {/* group pincode content ends */}

                                        {/* Products Images starts */}
                                        {activeButton === 6 &&
                                            <div className='product-form mt-4' style={{ height: "500px" }}>
                                                {/* <NewCreateProduct/> */}
                                                <div className='generalinfowrapper'>
                                                    <div className="generalinfowrapper-body row">
                                                        <div className="address row row_imp w-100">
                                                            <div className='col-lg-4 main_image'>
                                                                <div className='category_image_section d-flex'>
                                                                    <div className='inner_category_image mt-4 me-5'>
                                                                        <label className='mb-2 fw-bold'> For Destop (400 X 400 |  File type: webp) </label>
                                                                        <div className='Imagecontainermain'>
                                                                            {DesktopImages.map((item, index) => {
                                                                                return (
                                                                                    <div
                                                                                        key={index}
                                                                                        className="image-item"
                                                                                        onDragStart={handleDragStart(index)}

                                                                                        onDrop={(e) => handleDrop(e, index)}
                                                                                        onDragOver={(e) => e.preventDefault()}
                                                                                        draggable
                                                                                    >
                                                                                        {index == 1 ?

                                                                                            <>


                                                                                                <div className='secdiv'>
                                                                                                    <label htmlFor="fileInput2" className='secImage'>

                                                                                                        {(item.type === 'video') ?

                                                                                                            <video
                                                                                                                ref={videoRefs.current[index]}

                                                                                                                controls={false}
                                                                                                                className='draggableVideo'

                                                                                                                src={item.ImageUrl}
                                                                                                                style={{ width: "100px", height: "100px" }}
                                                                                                            />
                                                                                                            :
                                                                                                            <img
                                                                                                                src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                style={{ cursor: 'pointer' }}
                                                                                                            />

                                                                                                        }


                                                                                                        <input
                                                                                                            type="file"
                                                                                                            id="fileInput2"
                                                                                                            accept="image/* video/*'"
                                                                                                            style={{ display: 'none' }}
                                                                                                            onChange={handleFileChange(index)}
                                                                                                        />


                                                                                                    </label>
                                                                                                    { a && item && item.type === 'video' && (
                                                                                                        <MdPlayCircleOutline
                                                                                                            style={{
                                                                                                            
                                                                                                                fontSize: "32px",
                                                                                                                color: "white",
                                                                                                                borderRadius: "50%",
                                                                                                                position: "absolute",
                                                                                                                bottom: "40%",
                                                                                                                left: "35px"
                                                                                                            }}
                                                                                                           
                                                                                                            onClick={() => handleVideoClickPlay(index)}
                                                                                                          
                                                                                                        />
                                                                                                       
                                                                                                    )}
                                                                                                    { b && item && item.type === 'video' && (
                                                                                                    <FaRegCirclePause 
                                                                                                        style={{
                                                                                                          
                                                                                                            fontSize: "32px",
                                                                                                            color: "white",
                                                                                                            borderRadius: "50%",
                                                                                                            position: "absolute",
                                                                                                            bottom: "40%",
                                                                                                            left: "35px"
                                                                                                        }}
                                                                                                        onClick={() => handleVideoClickPause(index)}
                                                                                                    />
                                                                                                    )}
                                                                                                        </div>
                                                                                            </>
                                                                                                : index == 2 ?
                                                                                                <>
                                                                                                    <div className='thirddiv'>
                                                                                                        <label htmlFor="fileInput3" className='thirdImage'>
                                                                                                            {(item.type === 'video') ?

                                                                                                                <video
                                                                                                                    ref={videoRefs.current[index]}

                                                                                                                    controls={false}
                                                                                                                    className='draggableVideo'

                                                                                                                    src={item.ImageUrl}
                                                                                                                    style={{ width: "100px", height: "100px" }}
                                                                                                                />
                                                                                                                :
                                                                                                                <img
                                                                                                                    src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                                />

                                                                                                            }


                                                                                                            <input
                                                                                                                type="file"
                                                                                                                id="fileInput3"
                                                                                                                accept="image/*video/*"
                                                                                                                style={{ display: 'none' }}
                                                                                                                onChange={handleFileChange(index)}
                                                                                                            />
                                                                                                        </label>
                                                                                                        { a && item && item.type === 'video'&& (
                                                                                                        <MdPlayCircleOutline
                                                                                                            style={{
                                                                                                            
                                                                                                                fontSize: "32px",
                                                                                                                color: "white",
                                                                                                                borderRadius: "50%",
                                                                                                                position: "absolute",
                                                                                                                bottom: "40%",
                                                                                                                left: "35px"
                                                                                                            }}
                                                                                                           
                                                                                                            onClick={() => handleVideoClickPlay(index)}
                                                                                                          
                                                                                                        />
                                                                                                       
                                                                                                    )}
                                                                                                    { b && item && item.type === 'video'  && (
                                                                                                    <FaRegCirclePause 
                                                                                                        style={{
                                                                                                          
                                                                                                            fontSize: "32px",
                                                                                                            color: "white",
                                                                                                            borderRadius: "50%",
                                                                                                            position: "absolute",
                                                                                                            bottom: "40%",
                                                                                                            left: "35px"
                                                                                                        }}
                                                                                                        onClick={() => handleVideoClickPause(index)}
                                                                                                    />
                                                                                                    )}
                                                         
                                                                                                    </div>
                                                                                                </>
                                                                                                : index == 3 ?
                                                                                                <>
                                                                                                    <div className='fourthdiv'>
                                                                                                        <label htmlFor="fileInput4" className='forthImage'>
                                                                                                            {(item.type === 'video') ?

                                                                                                                <video
                                                                                                                    controls={true}
                                                                                                                    className='draggableVideo'

                                                                                                                    src={item.ImageUrl}
                                                                                                                    style={{ width: "100px", height: "100px" }}
                                                                                                                />
                                                                                                                :
                                                                                                                <img
                                                                                                                    src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                                />
                                                                                                            }
                                                                                                            <input
                                                                                                                type="file"
                                                                                                                id="fileInput4"
                                                                                                                accept="image/*video/*"
                                                                                                                style={{ display: 'none' }}
                                                                                                                onChange={handleFileChange(index)}
                                                                                                            />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </>
                                                                                                : index == 4 ?
                                                                                                <>
                                                                                                    <div className='fifthdiv'>
                                                                                                        <label htmlFor="fileInput5" className='fifthImage'>
                                                                                                            {(item.type === 'video') ?

                                                                                                                <video


                                                                                                                    controls={true}
                                                                                                                    className='draggableVideo'

                                                                                                                    src={item.ImageUrl}
                                                                                                                    style={{ width: "100px", height: "100px" }}
                                                                                                                />
                                                                                                                :
                                                                                                                <img
                                                                                                                    src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                                />
                                                                                                            }
                                                                                                            <input
                                                                                                                type="file"
                                                                                                                id="fileInput5"
                                                                                                                accept="image/*video/*"
                                                                                                                style={{ display: 'none' }}
                                                                                                                onChange={handleFileChange(index)}
                                                                                                            />
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <div className='imagecontainerright'>
                                                                                                        <div className='firstdiv'>
                                                                                                            <label htmlFor="fileInput" className='Mainimage'>
                                                                                                                {(item.type === 'video') ?

                                                                                                                    <video
                                                                                                                        controls={true}
                                                                                                                        className='draggableVideo'

                                                                                                                        src={item.ImageUrl}

                                                                                                                    />
                                                                                                                    :
                                                                                                                    <img
                                                                                                                        src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                        className={'' + (!item.ImageUrl && index === 0 ? ' inputerrors' : '')}
                                                                                                                        style={{ cursor: 'pointer' }}
                                                                                                                    />
                                                                                                                }
                                                                                                                {/* <img
                                                                                                                            src={item.ImageUrl ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                            className={'' + (!item.ImageUrl && index === 0 ? ' inputerrors' : '')}
                                                                                                                            style={{ cursor: 'pointer' }}
                                                                                                                        /> */}



                                                                                                                <input
                                                                                                                    type="file"
                                                                                                                    id="fileInput"
                                                                                                                    accept="image/*"
                                                                                                                    style={{ display: 'none' }}
                                                                                                                    onChange={handleFileChange(index)}
                                                                                                                />
                                                                                                                {item.type === 'video' && (
                                                                                                                    <MdPlayCircleOutline
                                                                                                                        style={{
                                                                                                                            fontSize: "32px",
                                                                                                                            color: "white",
                                                                                                                            borderRadius: "50%",
                                                                                                                            position: "absolute",
                                                                                                                            bottom: "40%",
                                                                                                                            left: "35px"
                                                                                                                        }}
                                                                                                                        onClick={(e) => {



                                                                                                                        }}
                                                                                                                    />
                                                                                                                )}

                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </>
                                                                                        }
                                                                                            </div>
                                                                                        )
                                                                            })}
                                                                                    </div>

                                                                    </div>

                                                                        <div className='inner_category_image'>
                                                                            <label className='mb-2 fw-bold'> For Mobile (390 X 390 |  File type: webp)</label>
                                                                            <div className='Imagecontainermain'>
                                                                                {MobileImages.map((item, index) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={index}
                                                                                            className="image-item"
                                                                                            onDragStart={handleDragStartMobile(index)}

                                                                                            onDrop={(e) => handleDropMobile(e, index)}
                                                                                            onDragOver={(e) => e.preventDefault()}
                                                                                            draggable
                                                                                        >
                                                                                            {index == 1 ?
                                                                                                <>
                                                                                                    <div className='secdiv imagecontainerleft'>
                                                                                                        <label htmlFor="fileInput2mob" className='secImage'>
                                                                                                            {(item.type === 'video') ?

                                                                                                                <video
                                                                                                                    controls={true}
                                                                                                                    className='draggableVideo'

                                                                                                                    src={item.ImageUrl}
                                                                                                                    style={{ width: "100px", height: "100px" }}
                                                                                                                />
                                                                                                                :
                                                                                                                <img
                                                                                                                    src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                                />
                                                                                                            }
                                                                                                            <input
                                                                                                                type="file"
                                                                                                                id="fileInput2mob"
                                                                                                                accept="image/*video/*"
                                                                                                                style={{ display: 'none' }}
                                                                                                                onChange={handleFileChangeMobile(index)}
                                                                                                            />
                                                                                                        </label>
                                                                                                    </div>

                                                                                                </>
                                                                                                : index == 2 ?
                                                                                                    <>
                                                                                                        <div className='thirddiv imagecontainerleft'>
                                                                                                            <label htmlFor="fileInput3mob" className='thirdImage'>
                                                                                                                {(item.type === 'video') ?

                                                                                                                    <video
                                                                                                                        controls={true}
                                                                                                                        className='draggableVideo'

                                                                                                                        src={item.ImageUrl}
                                                                                                                        style={{ width: "100px", height: "100px" }}
                                                                                                                    />
                                                                                                                    :
                                                                                                                    <img
                                                                                                                        src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                        style={{ cursor: 'pointer' }}
                                                                                                                    />
                                                                                                                }
                                                                                                                <input
                                                                                                                    type="file"
                                                                                                                    id="fileInput3mob"
                                                                                                                    accept="image/*"
                                                                                                                    style={{ display: 'none' }}
                                                                                                                    onChange={handleFileChangeMobile(index)}
                                                                                                                />
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </>
                                                                                                    : index == 3 ?
                                                                                                        <>
                                                                                                            <div className='fourthdiv imagecontainerleft'>
                                                                                                                <label htmlFor="fileInput4mob" className='forthImage'>
                                                                                                                    {(item.type === 'video') ?

                                                                                                                        <video
                                                                                                                            controls={true}
                                                                                                                            className='draggableVideo'

                                                                                                                            src={item.ImageUrl}
                                                                                                                            style={{ width: "100px", height: "100px" }}
                                                                                                                        />
                                                                                                                        :
                                                                                                                        <img
                                                                                                                            src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                            style={{ cursor: 'pointer' }}
                                                                                                                        />
                                                                                                                    }
                                                                                                                    <input
                                                                                                                        type="file"
                                                                                                                        id="fileInput4mob"
                                                                                                                        accept="image/*"
                                                                                                                        style={{ display: 'none' }}
                                                                                                                        onChange={handleFileChangeMobile(index)}
                                                                                                                    />
                                                                                                                </label>
                                                                                                            </div>
                                                                                                        </>
                                                                                                        : index == 4 ?
                                                                                                            <>
                                                                                                                <div className='fifthdiv imagecontainerleft'>
                                                                                                                    <label htmlFor="fileInput5mob" className='fifthImage'>
                                                                                                                        {(item.type === 'video') ?

                                                                                                                            <video
                                                                                                                                controls={true}
                                                                                                                                className='draggableVideo'

                                                                                                                                src={item.ImageUrl}
                                                                                                                                style={{ width: "100px", height: "100px" }}
                                                                                                                            />
                                                                                                                            :
                                                                                                                            <img
                                                                                                                                src={(item.ImageUrl) ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                                style={{ cursor: 'pointer' }}
                                                                                                                            />
                                                                                                                        }
                                                                                                                        <input
                                                                                                                            type="file"
                                                                                                                            id="fileInput5mob"
                                                                                                                            accept="image/*"
                                                                                                                            style={{ display: 'none' }}
                                                                                                                            onChange={handleFileChangeMobile(index)}
                                                                                                                        />
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </>
                                                                                                            :
                                                                                                            <>
                                                                                                                <div className='imagecontainerright'>
                                                                                                                    <div className='firstdiv'>
                                                                                                                        <label htmlFor="fileInputmob" className='Mainimage'>
                                                                                                                            {(item.type === 'video') ?

                                                                                                                                <video
                                                                                                                                    controls={true}
                                                                                                                                    className='draggableVideo'

                                                                                                                                    src={item.ImageUrl}

                                                                                                                                />
                                                                                                                                :
                                                                                                                                <img
                                                                                                                                    src={item.ImageUrl ? item.ImageUrl : config.placeholderimageurl}
                                                                                                                                    className={'' + (!item.ImageUrl && index === 0 ? ' inputerrors' : '')}
                                                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                                                />
                                                                                                                            }

                                                                                                                            <input
                                                                                                                                type="file"
                                                                                                                                id="fileInputmob"
                                                                                                                                accept="image/*"
                                                                                                                                style={{ display: 'none' }}
                                                                                                                                onChange={handleFileChangeMobile(index)}
                                                                                                                            />
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </>
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                })}

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>}
                                                {/* Products Images ends */}

                                                {/* attributes starts */}
                                                {activeButton === 7 &&
                                                    <div className="product-form mt-4" style={{ height: "650px" }}>
                                                        <div className='generalinfowrapper'>
                                                            <div className="generalinfowrapper-body row">
                                                                <div className='wrppercrtrle pb-3'>
                                                                    {AllAttributes.map((item, ind) => {
                                                                        return (
                                                                            <>
                                                                                <div>
                                                                                    <table className='tableAttibute' style={{ width: "479px" }}>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th className="text-center w1"></th>
                                                                                                <th className="text-center w2"></th>
                                                                                                <th className="text-center w3"></th>
                                                                                                <th className="text-center w4">
                                                                                                </th>
                                                                                                <th colspan="2" className="text-center w5" style={{ width: "145px" }}> {(ind < 1) ? 'Vendor Price' : ''}</th>
                                                                                                <th className="text-center w6"></th>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <th className="text-center w1"></th>
                                                                                                <th className="text-center w2"></th>
                                                                                                <th className="text-center w3"></th>
                                                                                                <th className="text-center w4"> {(ind < 1) ? 'Price' : ''}
                                                                                                </th>
                                                                                                <th className="text-center w5"> {(ind < 1) ? BaseCurrency.adminLabel + ' Price' : ''}
                                                                                                </th>
                                                                                                <th className="text-center w5"> {(ind < 1) ? 'Base Price' : ''} </th>
                                                                                                <th className="text-center w6"> {(ind < 1) ? 'Default' : ''} </th>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <th className="text-center w1" onClick={() => toggleSubMenu(item[0].parentmenuname)}>{subMenuVisibility[item[0].parentmenuname] ? <HiMinus /> : <HiPlus />}</th>
                                                                                                <th className="text-center w2">{item[0].parentmenuname}</th>
                                                                                                <th className="text-center w3"></th>
                                                                                                <th className="text-center w4"></th>
                                                                                                <th className="text-center w5"></th>
                                                                                                <th className="text-center w5"></th>
                                                                                                <th className="text-center w6"></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {subMenuVisibility[item[0].parentmenuname] && item[1].submenus && item[1].submenus.map((data, index) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <tr className=''>
                                                                                                            <td className="tdstyle w1"></td>
                                                                                                            <td className="tdblank w2"></td>
                                                                                                            <td className="tdSecond text-left ps-1 w3">{data.AttributeItemName}</td>
                                                                                                            <td className="tdInput w4">
                                                                                                                <input type="text" style={{ width: "58px" }}
                                                                                                                    value={SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId)?.attributePrice || ''}
                                                                                                                    onChange={(e) => setAttribute(e, data.AttributeItemId, data.AttributeNo, 'attributePrice')}
                                                                                                                    className={`tdVendorPrice form-control
                                                                                                            text-end ${SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId && attr.hasOwnProperty('attributePriceIsValid') && attr.attributePriceIsValid) ? 'inputerrors' : ''}`} placeholder='0.00'></input>
                                                                                                            </td>
                                                                                                            <td className="tdblank w5">
                                                                                                                <input type="text"
                                                                                                                    value={SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId)?.VenderINRPrice || ''}
                                                                                                                    onChange={(e) => setAttribute(e, data.AttributeItemId, data.AttributeNo, 'VenderINRPrice')}
                                                                                                                    className={`tdVendorPrice form-control text-end ${SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId && attr.hasOwnProperty('VenderINRPriceIsValid') && attr.VenderINRPriceIsValid) ? 'inputerrors' : ''}`} placeholder='0.00'></input>
                                                                                                            </td>
                                                                                                            <td className="tdblank w5">
                                                                                                                <input type="text"
                                                                                                                    value={SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId)?.VenderBasePrice || ''}
                                                                                                                    onChange={(e) => setAttribute(e, data.AttributeItemId, data.AttributeNo, 'VenderBasePrice')}
                                                                                                                    className={`tdVendorPrice form-control text-end ${SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId && attr.hasOwnProperty('VenderBasePriceIsValid') && attr.VenderBasePriceIsValid) ? 'inputerrors' : ''}`} placeholder='0.00'></input>
                                                                                                            </td>
                                                                                                            <td className="tdblank w6">
                                                                                                                <input type="radio" name={item[0].parentmenuname} checked={SlectedProductAttribute.find(attr => attr.AttributeItemId === data.AttributeItemId)?.IsDefault === 1} onClick={(e) => setAttribute(e, data.AttributeItemId, data.AttributeNo, 'IsDefault')} />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </>
                                                                                                )
                                                                                            })}
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div >
                                                            </div>
                                                        </div>
                                                    </div>}
                                                {/* attributes ends */}

                                                {/* variation starts */}
                                                {activeButton === 8 &&
                                                    <div className="FormDiv mainFormDiv ms-3" style={{ marginBottom: "18px" }}>
                                                        <form onSubmit={handleSubmit}>
                                                            {VariationFormValues.map((element, index) => (
                                                                <div className="row w-100 slider_wrap_sld variation_product" key={index}>

                                                                    <div className="row w-100 pb-2 mt-4">
                                                                        <div className="first-name col-md-4">
                                                                            <label className='form_label'>Variation SKU</label>
                                                                            <input type=" text" name="first_name" className={'form-control' + (element.errvariation && !element.variation_sku ? ' inputerrors' : '')} onChange={(e) => getvariationSKU(e, index)} value={element.variation_sku} /></div>

                                                                        <div className="first-name col-md-4">
                                                                            <label className='form_label'>Variation Title</label>
                                                                            <input type=" text" name="first_name" className={'form-control' + (element.errvariation && !element.variation_title ? ' inputerrors' : '')} onChange={(e) => getvariationTitle(e, index)} value={element.variation_title} /></div>
                                                                        <div className="first-name col-md-1 text-center">
                                                                            <label className='form_label'>Default</label><br />
                                                                            <input className='' name='variation' type="radio" checked={element.IsDefault === 1} onClick={(e) => getIsDefault(e, index)} />
                                                                        </div>
                                                                        {/* <div className="first-name col-md-4">
                                                                    <label className='form_label'>Product SKU</label>
                                                                    <input type=" text" name="first_name" className="form-control" value={element.product_sku} /></div> */}
                                                                    </div>

                                                                    <div className="row  w-100 pb-2">
                                                                        <div className="first-name col-md-2">
                                                                            <label className='form_label'>Price</label>
                                                                            <input type="number" name="first_name" className={"Firstname form-control input-csize box-size" + (element.errvariation && !element.variation_price ? ' inputerrors' : '')} onChange={(e) => getvariationprice(e, index)} value={element.variation_price} /></div>
                                                                        <div className="first-name col-md-3"><label className='form_label'>Vendor Price {BaseCurrency.adminLabel}</label>
                                                                            <input type="number" name="first_name" className={"Firstname form-control input-csize box-size" + (element.errvariation && !element.variation_vendor_price ? ' inputerrors' : '')} onChange={(e) => getVariationvendorprice(e, index)} value={element.variation_vendor_price} />
                                                                        </div>
                                                                        <div className="first-name col-md-3"><label className='form_label'>Vendor Base Price</label>
                                                                            <input type="number" name="first_name" className={"Firstname form-control input-csize box-size" + (element.errvariation && !element.variation_vendor_base_price ? ' inputerrors' : '')} onChange={(e) => getVariationvendorbaseprice(e, index)} value={element.variation_vendor_base_price} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row  w-100 pb-2">
                                                                        <div className="first-name col-md-4">
                                                                            <label className='form_label'>Variation Status</label>
                                                                            <select className="ew-inputRole form-control box-size" name="status" onChange={(e) => getvariationstatus(e, index)} value={element.variation_status} >
                                                                                <option value="1">Active</option>
                                                                                <option value="0">In-Active</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="first-name col-md-2">
                                                                            <label className="form_label"> Variation Image</label>
                                                                            <div className='wrap_image'>
                                                                                <label htmlFor={`catImageDesktop${index}`} className="custom-file-upload" style={{ marginTop: "0px" }}>
                                                                                    Choose File
                                                                                </label>
                                                                                <input id={`catImageDesktop${index}`} className={"c-logo form-control ew-inputRole box-size " + (element.errvariation && !element.previewimageurl ? ' inputerrors' : '')} type="file" name="myfile" style={{ display: 'none' }} onChange={(e) => imageSelect(e, index)} />
                                                                            </div>
                                                                        </div>

                                                                        <div className='wrap-image_variation col-md-2'>
                                                                            {element.previewimageurl && (
                                                                                <img style={{ maxWidth: '100%', paddingTop: '20px' }} src={element.previewimageurl} alt=" " />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        element ?
                                                                            <div className="col-md-3">
                                                                                <ImCross type="button" className="button remove_variation" onClick={() => removeFormFields(index)} />
                                                                            </div>
                                                                            : null
                                                                    }
                                                                </div>
                                                            ))}
                                                            <div className="col-md-2">
                                                                <div className='BtnCreate mt-2 mb-2' style={{ width: "73px" }} type="button" onClick={() => addFormFields()}>Add<HiPlus /></div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                }
                                                {/* variation ends */}

                                                {/* Description starts */}
                                                {activeButton === 9 &&
                                                    <div className='row mb-1 pt-2 mt-3 ms-4'>
                                                        <div className='col-md-6'>
                                                            <div className="addressline1"><label className="form_label">Short Description</label>
                                                                <SunEditor
                                                                    setOptions={{
                                                                        buttonList: [
                                                                            // default
                                                                            ['undo', 'redo',],
                                                                            ['bold', 'underline', 'italic', 'list'],
                                                                            ['table', 'link', 'image'],
                                                                            ['fullScreen', 'showBlocks', 'codeView'],
                                                                        ],
                                                                        attributesWhitelist: {
                                                                            'all': '*',
                                                                        }
                                                                    }}
                                                                    height="100%" onChange={handleproshortDescription}
                                                                    setContents={shortdescription} />
                                                            </div>

                                                            <div className="addressline1 mt-1"><label className="form_label">Description</label>
                                                                <SunEditor
                                                                    setOptions={{
                                                                        minHeight: 185,
                                                                        buttonList: [
                                                                            // default
                                                                            ['undo', 'redo',],
                                                                            ['bold', 'underline', 'italic', 'list'],
                                                                            ['table', 'link', 'image'],
                                                                            ['fullScreen', 'codeView'],
                                                                        ],
                                                                        attributesWhitelist: {
                                                                            'all': '*',
                                                                        }
                                                                    }}
                                                                    height="100%" onChange={handleproDescription}
                                                                    setContents={productdescription}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-6'>
                                                            <div className="addressline1 custmChallan"><label className="form_label"> Challan Short Description</label>
                                                                <SunEditor
                                                                    className='form-control'
                                                                    setOptions={{
                                                                        buttonList: [
                                                                            // default
                                                                            ['undo', 'redo',],
                                                                            ['bold', 'underline', 'italic', 'list'],
                                                                            ['table', 'link', 'image'],
                                                                            ['fullScreen', 'codeView'],
                                                                        ],
                                                                        attributesWhitelist: {
                                                                            'all': '*',
                                                                        }
                                                                    }} height="100%" onChange={handleChallanshortDescription}
                                                                    setContents={challanshortDescription} />

                                                            </div>

                                                            <div className="addressline1 custmChallan mt-1"><label className="form_label"> Challan Description</label>
                                                                <SunEditor
                                                                    setOptions={{
                                                                        minHeight: 185,
                                                                        buttonList: [
                                                                            // default
                                                                            ['undo', 'redo',],
                                                                            ['bold', 'underline', 'italic', 'list'],
                                                                            ['table', 'link', 'image'],
                                                                            ['fullScreen', 'codeView'],
                                                                        ],
                                                                        attributesWhitelist: {
                                                                            'all': '*',
                                                                        }
                                                                    }}
                                                                    height="100%" onChange={handleproChallanDescription}
                                                                    setContents={ChallanDescription}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* Description ends */}

                                                {/* related products starts */}
                                                {(activeButton === 10 && Productcountry) ?
                                                    <div className="product-form mt-4">
                                                        <div className=''>
                                                            {/* <label className="form_label"> Related Products </label> */}
                                                            <div className="ag-theme-alpine" style={{ height: "102vh" }}>
                                                                <AgGridReact
                                                                    columnDefs={productsCol}
                                                                    rowData={AllProductsCountryWise}
                                                                    pagination={true}
                                                                    paginationPageSize='10'
                                                                // onRowClicked={(e) => handleProductDarshboard(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : (activeButton === 10 && !Productcountry) ? <div className='stylingproductcat fw-bolder mt-5 pt-3' > Select Country</div> : ''}
                                                {/* related products ends */}

                                            </div>
                                </div>
                                </div>
                            </div>
                        </div >

                    </div>
                </div >
            </>
            )
}
