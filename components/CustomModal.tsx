import { Modal } from "@mui/material";
import Input from "./Input";
import { ThemeContext } from "./Theme";
import { useContext } from "react";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >;
  form: { name: string; email: string };
  title: string;
  handleSubmit: () => void;
}

export const CustomModal = ({
  open,
  handleClose,
  setForm,
  form,
  title,
  handleSubmit,
}: ModalProps) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md ${
          isDark ? "bg-[#121212]" : "bg-white"
        } rounded-lg p-6 shadow-lg dark:bg-zinc-900`}
      >
        <h2
          className={`text-xl font-bold mb-5 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>
        <form className="space-y-2">
          <Input
            htmlFor="name"
            name="name"
            label="Name"
            id="name"
            placeholder="Your name"
            type="name"
            required
            autoComplete="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
          <Input
            htmlFor="email"
            name="email"
            label="Email"
            id="email"
            placeholder="name@example.com"
            type="email"
            required
            autoComplete="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
          <div className="flex w-full my-5">
            <button
              type="button"
              className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
              disabled={!form.name || !form.email}
            >
              <span>Confirm</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
