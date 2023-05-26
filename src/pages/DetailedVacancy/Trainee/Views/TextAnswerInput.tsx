import { Form, Input } from "antd";

export const TextAnswerInput = () => {
  return (
    <Form>
      <Form.Item label="Решение тестового задания">
        <Input placeholder="Введите ссылку с решением тестового задания" />
      </Form.Item>
    </Form>
  );
};
