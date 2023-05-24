import { useState, useEffect, useCallback } from "react";
import {
  Degree,
  Education,
  TraineeProfileType,
  UpdateTraineeProfile,
  WorkExperiences,
} from "../../store/traineeProfile/types";
import { isNil, omitBy, pickBy } from "lodash";
type ProfileEditType = Partial<TraineeProfileType> & {
  onChange: (data: Partial<UpdateTraineeProfile>) => void;
  countries: { id: number; name: string }[];
};

export const useProfileEdit = ({
  onChange,
  countries,
  ...data
}: ProfileEditType) => {
  const [editingObj, setEditingObj] = useState<Partial<UpdateTraineeProfile>>({
    ...JSON.parse(JSON.stringify(data)),
    citizenship: 471,
  });
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    onChange(editingObj);
  }, [editingObj, onChange]);

  const handleChangeCity = (id: number) => {
    setEditingObj((p) => ({ ...p, citizenship: id }));
  };

  const handleDeleteLink = (url: string) => {
    setEditingObj((prev) => ({
      ...prev,
      links: prev.links?.filter((e) => e.url !== url),
    }));
  };

  const handleChangeLink = (str: string) => {
    setLink(str);
    setLinkError("");
  };

  const handleAddLink = () => {
    if (
      !link.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
    ) {
      setLinkError("Неккоректная ссылка");
      return;
    }

    if (link && !editingObj.links?.find((el) => el.url === link)) {
      setEditingObj((prev) => ({
        ...prev,
        links: [...(prev.links || []), { url: link }],
      }));
      setLink("");
    }
  };

  const addNewWork = () => {
    setEditingObj((p) => ({
      ...p,
      work_experiences: [
        ...(p.work_experiences || []),
        {
          description: "",
          employer: "",
          end_date: "",
          position: "",
          start_date: "",
        },
      ],
    }));
  };

  const deleteWork = (idx: number) => {
    setEditingObj((p) => ({
      ...p,
      work_experiences: [
        ...(p.work_experiences || []).filter((_, i) => i !== idx),
      ],
    }));
  };

  const addNewEducation = () => {
    setEditingObj((p) => ({
      ...p,
      educations: [
        ...(p.educations || []),
        {
          degree: Degree.Bachelor,
          description: "",
          end_year: "",
          name: "",
          specialization: "",
          start_year: "",
          type: "school",
        },
      ],
    }));
  };

  const deleteEducation = (idx: number) => {
    const t = editingObj.educations || [];
    t.splice(idx, 1);
    setEditingObj((p) => ({ ...p, educations: [...t] }));
  };

  const handleChangeBio = (val: string) => {
    setEditingObj((p) => ({ ...p, bio: val }));
  };

  const changeWork = (
    idx: number,
    field: keyof WorkExperiences,
    value: string
  ) => {
    const works = [...(editingObj.work_experiences || [])];
    const workCopy = { ...works[idx] };
    workCopy[field] = value;

    works.splice(idx, 1, workCopy);
    setEditingObj((p) => ({ ...p, work_experiences: works }));

  }

  const handleChangeEducation = (
    idx: number,
    field: keyof Education,
    value: string
  ) => {
    const educations = [...(editingObj.educations || [])];
    const educationCopy = { ...educations[idx] };

    if (field === "type" && value === "school") {
      educationCopy.specialization = "";
    }

    if (field === "degree") {
      educationCopy[field] = value as Degree;
    } else {
      educationCopy[field] = value;
    }
    educations.splice(idx, 1, educationCopy);
    setEditingObj((p) => ({ ...p, educations }));
  };
  const handleChangeSex = (sex: string) => {
    if (sex === "N") {
      setEditingObj((p) => ({ ...p, sex: null }));
    }
    setEditingObj((p) => ({ ...p, sex }));
  };

  return {
    editingObj,
    setEditingObj,
    link: {
      value: link,
      error: linkError,
      onChange: handleChangeLink,
      onDelete: handleDeleteLink,
      onAdd: handleAddLink,
    },
    work: {
      value: editingObj.work_experiences || [],
      onAdd: addNewWork,
      onDelete: deleteWork,
      onChange: changeWork
    },
    educations: {
      value: editingObj.educations || [],
      onAdd: addNewEducation,
      onDelete: deleteEducation,
      onChange: handleChangeEducation,
    },
    bio: {
      value: editingObj.bio,
      onChange: handleChangeBio,
    },
    sex: {
      value: editingObj.sex,
      onChange: handleChangeSex,
    },
    citizenship: {
      value: editingObj.citizenship,
      onChange: handleChangeCity,
    },
  };
};
