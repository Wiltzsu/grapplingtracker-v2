import React, { useState, useEffect } from "react";
import { Disclosure } from '@headlessui/react';
import { PlusIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import dayjs from 'dayjs';


export const DynamicList = ({ categories, positions, onTechniquesChange }) => {
    const { data, setData, post, processing, errors } = useForm({
        techniques: [{
            technique_name: '',
            technique_description: '',
            category_id: '',
            position_id: '',
            class_id: ''
        }]
    });

    // Add useEffect to notify parent of changes
    useEffect(() => {
        onTechniquesChange(data.techniques);
    }, [data.techniques]);

    const addTechniqueForm = () => {
        setData('techniques', [...data.techniques, {
            technique_name: '',
            technique_description: '',
            category_id: '',
            position_id: '',
            class_id: ''
        }]);
    };

    const updateTechnique = (index, field, value) => {
        const updatedTechniques = [...data.techniques];
        updatedTechniques[index] = {
            ...updatedTechniques[index],
            [field]: value
        };
        setData('techniques', updatedTechniques);
    };

    const removeTechnique = (index) => {
        setData('techniques', data.techniques.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('techniques.store'), {
            onSuccess: () => {
                // Handle success
            },
        });
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                            <span>Add New Technique{data.techniques.length > 1 ? 's' : ''}</span>
                            <ChevronUpIcon
                                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-indigo-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {data.techniques.map((technique, index) => (
                                <div key={index} className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium">Technique #{index + 1}</h3>
                                        {data.techniques.length > 1 && (
                                            <button
                                                onClick={() => removeTechnique(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    {/* Name field */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor={`technique_name_${index}`} value={<>Name <span className="text-red-500">*</span></>} />
                                        <TextInput
                                            id={`technique_name_${index}`}
                                            type="text"
                                            value={technique.technique_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => updateTechnique(index, 'technique_name', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Description field */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor={`technique_description_${index}`} value={<>Description <span className="text-red-500">*</span></>} />
                                        <textarea
                                            id={`technique_description_${index}`}
                                            value={technique.technique_description}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            onChange={(e) => updateTechnique(index, 'technique_description', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Category selection field */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor={`category_id_${index}`} value={<>Category <span className="text-red-500">*</span></>} />
                                        <select
                                            id={`category_id_${index}`}
                                            name={`category_id_${index}`}
                                            value={technique.category_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                                            onChange={(e) => updateTechnique(index, 'category_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories && categories.length > 0 ? (
                                                categories.map((category) => (
                                                    <option key={category.category_id} value={category.category_id}>
                                                        {category.category_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">No categories available</option>
                                            )}
                                        </select>
                                    </div>

                                    {/* Position selection field */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor={`position_id_${index}`} value={<>Position <span className="text-red-500">*</span></>} />
                                        <select
                                            id={`position_id_${index}`}
                                            name={`position_id_${index}`}
                                            value={technique.position_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-opacity-50 rounded-md shadow-sm"
                                            onChange={(e) => updateTechnique(index, 'position_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a position</option>
                                            {positions && positions.length > 0 ? (
                                                positions.map((position) => (
                                                    <option key={position.position_id} value={position.position_id}>
                                                        {position.position_name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">No positions available</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addTechniqueForm}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Another Technique
                            </button>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};