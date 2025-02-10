import { Button, Form, Input } from '@heroui/react';
import React from 'react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../svg/eyeSlashFilled';
import Link from 'next/link';


export interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    isLogin?: boolean;
}

function FormAuth(props: FormProps) {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const errors: string[] = []

    if (props.password.length < 4) {
        errors.push("Password must be 4 characters or more.");
    }
    if ((props.password.match(/[A-Z]/g) || []).length < 1) {
        errors.push("Password must include at least 1 upper case letter");
    }
    if ((props.password.match(/[^a-z]/gi) || []).length < 1) {
        errors.push("Password must include at least 1 symbol.");
    }
    return (
        <Form
            onSubmit={props.onSubmit}
            validationBehavior="native"
        >
            <div className="flex w-full flex-col space-y-10">
                <Input
                    isRequired
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter your name"
                    name="name"
                    variant="bordered"
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing)
                            return "Please enter your name";
                    }}
                    radius="sm"
                    type="text"
                />
                <Input
                    isRequired
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter your email"
                    variant="bordered"
                    name="email"
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing)
                            return "Please enter your email";
                        if (validationDetails.typeMismatch)
                            return "Please enter a valid email address";
                    }}
                    radius="sm"
                    type="email"
                />
                <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    value={props.password}
                    onValueChange={props.setPassword}
                    placeholder="Enter your password"
                    variant="bordered"
                    name="password"
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing)
                            return "Please enter your password!"
                        return (
                            <ul>
                                {errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        );
                    }}
                    radius="sm"
                    type={isVisible ? "text" : "password"}
                    endContent={
                        <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                />
                <Button isLoading={props.isLoading} className="w-full font-semibold" color="primary" type="submit" radius="sm">
                    Submit
                </Button>
            </div>
            {props.isLogin ? <span className='flex items-center justify-center w-full text-sm font-light gap-1 mt-1'>Don&apos;t have an account?  <Link href='/signup' className='font-semibold '> Signup</Link></span> :
                <span className='flex items-center justify-center w-full text-sm font-light gap-1 mt-1'>Already i have an account  <Link href='/login' className='font-semibold '> Login</Link></span>}
        </Form>

    )
}

export default FormAuth
