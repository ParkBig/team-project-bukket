import { useForm } from "react-hook-form";

const Form = () => {
    const {register, handleSubmit, setValue} =useForm();
    const onValid = () => {}
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("writer")} />
                <input {...register("title")} />
                <input {...register("content")}/>
            </form>
        </div>
    );
}