import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const useGetEvents = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data } = await api.get(`/events`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
  return { isLoading, data, isError };
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync: addEvent } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/events`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Event added successfully");
      navigate("/events");
    },
    onError: (error) => {
      toast.error(
        error.response.data.msg || error.message || "something went wrong",
      );
      console.log(
        error.response.data.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, addEvent };
};

export const useGetSingleEvent = ({ id }) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["single-event", id],
    queryFn: async () => {
      const { data } = await api.get(`/events/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
  return { isLoading, data, isError };
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: deleteImage } = useMutation({
    mutationFn: async ({ imageType, eventId, publicId }) => {
      await api.patch(`/events/delete-image`, {
        imageType,
        eventId,
        publicId,
      });
    },
    onSuccess: (_, variables) => {
      const { eventId } = variables;
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event", eventId] });
      toast.success("image removed");
    },
    onError: (error) => {
      toast.error(
        error.response.data.msg || error.message || "something went wrong",
      );
      console.log(
        error.response.data.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, deleteImage };
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync: editEvent } = useMutation({
    mutationFn: async ({ data, id }) => {
      await api.patch(`/events/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["single-event", id] });
      toast.success("updated successfully");
      navigate("/events");
    },
    onError: (error) => {
      toast.error(
        error.response.data.msg || error.message || "something went wrong",
      );
      console.log(
        error.response.data.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, editEvent };
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: deleteEvent } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Successfully deleted");
    },
    onError: (error) => {
      toast.error(
        error.response.data.msg || error.message || "something went wrong",
      );
      console.log(
        error.response.data.msg || error.message || "something went wrong",
      );
    },
  });
  return { isPending, deleteEvent };
};
