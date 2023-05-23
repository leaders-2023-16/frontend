import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetTraineeProfileByIdQuery, useUpdateTraineeProfileByIdMutation } from '../../store/traineeProfile'
import { useAppSelector } from '../../store'
import { selectUserId } from '../../store/auth/selectors'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Space, Spin, Typography } from 'antd'
import { TraineeProfileView } from './Profile'
import { ProfileEdit } from './ProfileEdit'
import { TraineeProfileType } from '../../store/traineeProfile/types'

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export const TraineeProfile = () => {
    const [params] = useSearchParams()
    const userId = useAppSelector(selectUserId)
    const { data, isLoading } = useGetTraineeProfileByIdQuery(userId)
    const [updateData] = useUpdateTraineeProfileByIdMutation()
    const [isEditing, setIsEditing] = useState(!!params.get('edit'))
    const [editingObj, setEditingObj] = useState<Partial<TraineeProfileType>>({ })

    const handleChange = (data: Partial<TraineeProfileType>) => {
        setEditingObj(data)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleUpdate = () => {
        updateData({ id: userId, data: editingObj })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        setEditingObj({ ...data })
    }, [data])

    if (isLoading || !data) {
        return (
            <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
                <Col>
                    <Spin indicator={antIcon} />
                </Col>
            </Row>
        )
    }

    return (<>
        <Row justify={'space-between'} >
            <Col>
                <Typography.Title level={3}>{data.first_name}&nbsp;{data.last_name}</Typography.Title></Col>
            <Col>
                {!isEditing ? <Button style={{ marginTop: '8px' }} onClick={handleEdit}>Редактировать</Button> :
                    <Space>
                        <Button style={{ marginTop: '8px' }} onClick={handleUpdate}>Сохранить</Button>
                        <Button style={{ marginTop: '8px' }} onClick={handleCancel}>Отменить</Button>
                    </Space>
                }
            </Col>
        </Row>

        {isEditing ?
            <>
                <ProfileEdit {...data} onChange={handleChange} />
            </>
            : <>
                <TraineeProfileView {...data} />
            </>}
    </>)

}