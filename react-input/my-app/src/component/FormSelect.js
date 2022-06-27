import { Form, Input, Button, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormSelect = () => {
  const [form] = Form.useForm();
	const [items, setItem] = useState()

  const onGenderChange = (value) => {
		setItem(value)
    // eslint-disable-next-line default-case
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  const onSubmit = (values) => {
    console.log(form);
		form.validateFields().then(value => {
			console.log(value, '---------------')
		}).catch(err => {

		})
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks">
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
				<div>
					<Input />
				</div>
      </Form.Item>
			<Form.Item
					name="gender"
					label="Gender"
					required
					rules={[
						() => ({
							validator(_, value) {
								if (items) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
							},
						}),
					]}
				>
					<div>
						<Select
							placeholder="Select a option and change input text above"
							onChange={onGenderChange}
							allowClear
						>
							<Option value="male">male</Option>
							<Option value="female">female</Option>
							<Option value="other">other</Option>
						</Select>
					</div>
				</Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSelect
