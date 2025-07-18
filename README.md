# 🧑‍💼 Employee Management Dashboard

تطبيق ويب بسيط لإدارة الموظفين باستخدام **JavaScript** و**DOM** فقط، دون أي مكتبة خارجية.



## ✅ الميزات:
- يوجد mode dark , scroll To Top Button
- تصميم يناسب جميع مقاسات الشاشه 
- ✅ إضافة موظف جديد من خلال نموذج يحتوي على: الاسم، الوظيفه، الحالة.
- يتم اضافتهم الى جدول الموظفين 
يوجد two option في الجدول
- 📝 تعديل بيانات الموظف (الاسم، الدور، الحالة).1
- ❌ 2.حذف الموظف (نقل إلى سلة المهملات).
- في جدول سلة المهملات 
يوجد زر للتحكم بظهور واخفاء جدول سلة المهملات
- ♻️ استعادة الموظف من سلة المهملات أو حذفه نهائيًا.
- 🔁 عرض مباشر لعدد الموظفين النشطين والمحذوفين.
- 🏷️ الشارة تتغير لونها حسب الحالة: `Active` – أخضر، `On Leave` – برتقالي، `Terminated` – أحمر.
- ⚙️ استخدام أحداث JavaScript وDOM Selectors مثل:
  - `getElementById`,`getElementByClassName`,
  - `querySelector` ,`querySelectorAll`
  - `setAttribute`, `getAttribute`
  - `innerText`, `textContent`, `innerHTML`
  - `console.time()` و `console.timeEnd()`


## 📌 لقطة شاشة - إضافة موظف
![إضافة موظف](screenshot/screenshot1.png)

## 🗑️ لقطة شاشة - حذف موظف إلى سلة المهملات
![حذف إلى المهملات](screenshot/screenshot2.png)

## ⚠️ لقطة شاشة - حذف نهائي من سلة المهملات
![حذف نهائي](screenshot/screenshot3.png)

## 📱 لقطة شاشة - عند تصغير الشاشة (عرض متجاوب)
![Responsive View](screenshot/screenshot4.png)
![Responsive View 2](screenshot/screenshot5.png)

## 📂 هيكل الملفات:

##📁 employee-management-app
│
├── index.html 
├── style.css 
├── script.js 
├── README.md 
##└── 📁 screenshot
    ├── screenshot1.png
    ├── screenshot2.png
    ├── screenshot3.png
    ├── screenshot4.png
    ├── screenshot5.png
