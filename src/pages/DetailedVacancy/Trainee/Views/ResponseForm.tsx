import { Form, Input } from "antd";

export const ResponseForm = () => {
  return (
    <Form>
      <Form.Item label="Сопроводительное письмо">
        <Input.TextArea
          placeholder="Напишите почему вы хотите работать именно с нами ;)"
          rows={5}
        />
      </Form.Item>
      <Form.Item label="Решение тестового задания">
        <Input placeholder="Введите ссылку с решением тестового задания" />
      </Form.Item>
    </Form>
  );
};
