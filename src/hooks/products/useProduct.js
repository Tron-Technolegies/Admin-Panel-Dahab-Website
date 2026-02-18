import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const useGetAllProducts = ({ keyWord }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products", keyWord],
    queryFn: async () => {
      const { data } = await api.get(`/admin/product`, {
        params: { keyWord },
      });
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useGetSingleAdminProduct = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/product/${id}`);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useMakeFeatured = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: makeFeatured } = useMutation({
    mutationFn: async ({ id }) => {
      await api.patch(`/admin/product/make-featured`, { id });
    },
    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({ queryKey: ["single-product", id] });
      toast.success("Product is now featured");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, makeFeatured };
};

export const useRemoveFeatured = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: removeFeatured } = useMutation({
    mutationFn: async ({ id }) => {
      await api.patch(`/admin/product/remove-featured`, { id });
    },
    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({ queryKey: ["single-product", id] });
      toast.success("Product removed as featured");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, removeFeatured };
};
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: addProduct } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/product/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
      navigate("/products");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, addProduct };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync: deleteProduct } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("product deleted successfully");
      navigate("/products");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, deleteProduct };
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: editProduct } = useMutation({
    mutationFn: async ({ id, data }) => {
      await api.patch(`/admin/product/${id}`, data, {
        headers: { "Content-Type": "multipart-formdata" },
      });
    },
    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["single-product", id] });
      toast.success("Product updated successfully");
      navigate(`/products/${id}`);
    },
    onError: (error) => {
      toast.error(
        error.response.data.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, editProduct };
};
