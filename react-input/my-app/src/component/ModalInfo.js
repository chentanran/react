import { useState } from 'react'
import { Modal, Button, Row, Col, Input, Card } from 'antd'

const MYSQL = () => {
  return 'Mysql'
}

const Oracle = () => {
  return 'Oracle'
}

const ModalInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [switchTab, setSwitchTab] = useState('1')

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSql = (item) => {
    setSwitchTab(item)
  }

  const DBData = (item = 1) => {
    switch (item) {
      case 1:
        return MYSQL()
      case 2:
        return Oracle()
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title="Basic Modal" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
        width={'60%'}
      >
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <div>
            <span>连接名称 </span>
            <Input placeholder="请输入接口名称" style={{ width: '80%' }} />
          </div>
          <div style={{ padding: '20px 0',  }}>
            <Row>
              <Col span={7}>
              <Card title="数据库类型" bordered={false}>
                <div style={{ overflow: 'auto', height: '200px' }}>
                  {
                    [1,2,3,4,5].map(item => {
                      return (
                        <p onClick={() => { handleSql(item) }}>MySQL</p>
                      )
                    })
                  }
                </div>
              </Card>
              </Col>
              <Col span={14}>
              <Card title="设置" bordered={false}>
                <div style={{ overflow: 'auto', height: '200px' }}>
                  {
                    DBData(switchTab)
                  }
                </div>
              </Card>
              </Col>
            </Row>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Button type="primary">测试连接</Button>
            </div>
            <div>
              <Button >取消</Button>
              <Button type="primary" >确认</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalInfo