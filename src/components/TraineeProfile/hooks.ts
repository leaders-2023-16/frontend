import { useState, useEffect, useCallback } from "react";
import { Degree, Education, TraineeProfileType, UpdateTraineeProfile } from "../../store/traineeProfile/types";

type ProfileEditType = Partial<TraineeProfileType> & { onChange: (data: Partial<UpdateTraineeProfile>) => void }

export const useProfileEdit = ({ onChange, ...data }: ProfileEditType) => {
    const [editingObj, setEditingObj] = useState<Partial<UpdateTraineeProfile>>({ ...data, citizenship: 0 })
    const [link, setLink] = useState('')
    const [linkError, setLinkError] = useState('')
    const validate = useCallback(() => {
        if (editingObj.educations?.every(e => Boolean(e.name) || Boolean(e.start_year) || Boolean(e.specialization)) ){
            return false
        }

        return true
    }, [editingObj.educations])

    useEffect(() => {
        validate() && onChange(editingObj)
    }, [editingObj, onChange, validate])

    const handleDeleteLink = (url: string) => {
        setEditingObj(prev => ({ ...prev, links: prev.links?.filter(e => e.url !== url) }))
    }
    
    const handleChangeLink = (str: string) => {
        setLink(str)
        setLinkError('')
    }

    const handleAddLink = () => {
        if (!link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            setLinkError('Неккоректная ссылка')
            return
        }

        if (link && !editingObj.links?.find(el => el.url === link)) {
            setEditingObj((prev) => ({ ...prev, links: [...(prev.links || []), { url: link }] }))
            setLink('')
        }
    }

    const addNewWork = () => {
        setEditingObj(p => ({...p, work_experiences: [...(p.work_experiences || []), {description: '', employer: '', end_date: '', position: '', start_date: ''} ]}))
    }

    const deleteWork = (idx: number) => {
        setEditingObj(p => ({...p, work_experiences: [...(p.work_experiences || []).filter((_, i) => i !== idx)]}))
    }

    const addNewEducation = () => {
        setEditingObj(p => ({...p, educations: [...(p.educations || []), {degree: Degree.Bachelor, description: '', end_year: '', name: '', specialization: '', start_year: '', type: ''} ]}))
    }

    const deleteEducation = (idx: number) => {
        const t = editingObj.educations || []
        t.splice(idx, 1)
        setEditingObj(p => ({...p, educations: [...t]}))
    }

    const handleChangeBio = (val: string) => {
        setEditingObj(p => ({...p, bio: val}))
    }

    const handleChangeEducation = (idx: number,field: keyof Education, value: string) => {
        const t = [...editingObj.educations || []]
        const o = {...t[idx]}
        if (field === 'degree') {
            o[field] = value as Degree
        } else {
            o[field] = value
        }
        t.splice(idx, 1, o)
        setEditingObj(p => ({...p, educations: t}))
    }

    return {
        editingObj,
        setEditingObj,
        link: {
            value: link,
            error: linkError,
            onChange: handleChangeLink,
            onDelete: handleDeleteLink,
            onAdd: handleAddLink
        },
        work: {
            value: editingObj.work_experiences || [],
            onAdd: addNewWork,
            onDelete: deleteWork
        },
        educations: {
            value: editingObj.educations || [],
            onAdd: addNewEducation,
            onDelete: deleteEducation,
            onChange: handleChangeEducation,
        },
        bio: {
            value: editingObj.bio,
            onChange:  handleChangeBio
        }
    }
}