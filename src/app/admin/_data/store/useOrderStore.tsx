"use client"

import { create } from "zustand";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "../entity/ResponseEntity";
import { OrderEntity, OrderInterface } from "../entity/OrderEntity";
import { _orderListAction, _orderPaginateAction, _orderSearchAction, _orderViewAction } from "../actions/OrderActions";


interface PropsInterface {
    data: OrderInterface,
    dataList: OrderInterface[],
    meta: MetaInterface,
    links: MetaLinksInterface,
    preData: OrderInterface,
    errors: OrderInterface,
    search: string,
    isSearching: boolean,
    order: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    setDataListAll: (i: OrderInterface[]) => void,
    setIsLoading: (i: boolean) => void,
    setDataList: (i: ResponseInterface) => void, // Fixed missing comma
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSearching: (i: boolean) => void,
    setToggleModal: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setError: (name: string, value: string) => void,
    setValue: (name: string, value: string | number) => void,
    setData: (i: OrderInterface) => void,
    resetData: () => void,
    setIsSubmitting: (i: boolean) => void,
    setOrder: (i: string) => void,
    clearErrors: () => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: OrderInterface },
    getData: (i: number | string) => Promise<void>,
    getDataList: () => Promise<void>,
    getSearchDatalist: (search: string) => Promise<void>,
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useOrderStore = create<PropsInterface>((set, get) => ({
    data: OrderEntity,
    dataList: [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    preData: OrderEntity,
    errors: OrderEntity,
    search: '',
    isSearching: false,
    order: '',
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    setDataListAll: (i) => {
        set({
            dataList: i,
            isLoading: false,
        })
    },
    setValue: (name, value) => {
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: { ...currentData, [name]: value },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        })
    },
    setIsLoading: (i) => {
        set({
            isLoading: i
        })
    },
    setDataList: (i) => {
        const { data, links, meta } = i
        set({
            dataList: data,
            meta: meta,
            links: links,
            isLoading: false,
        })
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
        })
    },
    setIsSearching: (i) => {
        set({
            isSearching: i
        })
    },
    setToggleModal: (i) => {
        set({
            toggleModal: i
        })
    },
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        })
    },
    setData: (i) => {
        console.log('SetData', i)
        set({
            data: i,
            preData: i,
            isLoading: false,
        })
    },
    resetData: () => {
        set({
            data: OrderEntity,
        })
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i,
        })
    },
    setOrder: (i) => {
        set({
            order: i
        })
    },
    clearErrors: () => {
        set({
            errors: OrderEntity
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch (name) {
            case "customerName":
                if (!value || !value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "customerPhone":
                if (!value || !value.trim()) {
                    error = "Phone is required.";
                }
                break;
            case "customerEmail":
                if (!value || !value.trim()) {
                    error = "Email is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...OrderEntity };
        let hasError = false;

        // Validate customerName
        const customerNameError = get().validateField("customerName", data.customerName || "");
        if (customerNameError) {
            errors.customerName = customerNameError;
            hasError = true;
        }

        // Validate customerPhone
        const customerPhoneError = get().validateField("customerPhone", data.customerPhone || "");
        if (customerPhoneError) {
            errors.customerPhone = customerPhoneError;
            hasError = true;
        }

        // Validate customerEmail
        const customerEmailError = get().validateField("customerEmail", data.customerEmail || "");
        if (customerEmailError) {
            errors.customerEmail = customerEmailError;
            hasError = true;
        }

        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    getData: async (i) => {
        try {
            const res = await _orderViewAction(i);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: OrderEntity,
                    preData: OrderEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: OrderEntity,
                preData: OrderEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _orderListAction();
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
    getSearchDatalist: async (search) => {
        set({ isSearching: true });
        try {
            const res = await _orderSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isSearching: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isSearching: false,
            });
        }
    },
    getPaginatedDatalist: async (url: string) => {
        set({ isLoading: true });
        try {
            const res = await _orderPaginateAction(url);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
}))