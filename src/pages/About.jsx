import React from 'react';

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">เกี่ยวกับฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ข้อมูลส่วนตัวและเป้าหมายในชีวิต</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Personal Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ข้อมูลส่วนบุคคล</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ชื่อ–นามสกุล</div>
                  <div className="flex-1 text-gray-900 dark:text-white">ธนภัทร การะจักษ์</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ชื่อเล่น</div>
                  <div className="flex-1 text-gray-900 dark:text-white">Mk</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">วันเกิด</div>
                  <div className="flex-1 text-gray-900 dark:text-white">24 ตุลาคม 2550</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">อายุ</div>
                  <div className="flex-1 text-gray-900 dark:text-white">17 ปี (ณ ปี 2567)</div>
                </div>
                <div className="flex items-start">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ที่อยู่</div>
                  <div className="flex-1 text-gray-900 dark:text-white">จังหวัดอำนาจเจริญ ประเทศไทย</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Personal Statement */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">คำแนะนำตัว</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                ผมเป็นนักเรียนที่มีความกระตือรือร้นในการแสวงหาความรู้ใหม่ ๆ และมุ่งมั่นที่จะเก็บเกี่ยวประสบการณ์ที่หลากหลายอยู่เสมอ โดยเชื่อว่าการเรียนรู้ไม่ได้จำกัดเพียงในห้องเรียน แต่ยังรวมถึงการลงมือปฏิบัติจริงในสถานการณ์ต่าง ๆ ปัจจุบันผมกำลังมองหาโอกาสใหม่ ๆ เพื่อพัฒนาตนเองและต่อยอดสู่เส้นทางอาชีพที่มุ่งหวัง
              </p>
            </div>

            {/* Life Goal */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">เป้าหมายในชีวิต</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                ผมมีความมุ่งมั่นที่จะพัฒนาทักษะด้าน <strong className="text-blue-600 dark:text-blue-400">วิศวกรรมเครือข่าย</strong> เพื่อสร้างความมั่นคงให้แก่ครอบครัว เนื่องจากผมเติบโตมาท่ามกลางความยากลำบาก จึงตระหนักถึงความสำคัญของความมั่นคงในชีวิต และเชื่อมั่นว่า “การศึกษา” คือกุญแจสำคัญในการเปลี่ยนแปลงอนาคต
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                เป้าหมายหลักของผมคือการสอบเข้าศึกษาต่อใน <strong className="text-blue-600 dark:text-blue-400">คณะวิศวกรรมศาสตร์ สาขาเครือข่าย ณ มหาวิทยาลัยขอนแก่น</strong> เพื่อสานต่อความสนใจด้านเทคโนโลยีระบบเครือข่ายและโครงสร้างพื้นฐานทางอินเทอร์เน็ต ซึ่งเป็นอาชีพที่มีความสำคัญต่อโลกยุคดิจิทัลและสามารถสร้างความมั่นคงได้ในระยะยาว
              </p>
            </div>

            {/* Motto */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">คติประจำใจ</h3>
              <blockquote className="text-2xl italic text-gray-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-400">“</span>
                ไม่มีคำว่าสาย สำหรับผู้ที่มีความตั้งใจที่จะเริ่มต้นอย่างแท้จริง
                <span className="text-blue-600 dark:text-blue-400">”</span>
              </blockquote>
            </div>

            {/* Interests */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ความสนใจ</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">คอมพิวเตอร์และระบบปฏิบัติการ</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">ศึกษาและทดลองใช้งานระบบปฏิบัติการต่างๆ</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">ระบบเครือข่ายอินเทอร์เน็ต</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">วางระบบและแก้ไขปัญหาเครือข่าย</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">เทคโนโลยีและนวัตกรรมสมัยใหม่</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">ติดตามและทดลองใช้งานเทคโนโลยีใหม่ๆ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;