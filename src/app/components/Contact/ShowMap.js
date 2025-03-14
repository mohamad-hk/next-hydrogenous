export default function ShowMap() {
  return (
    <div className="flex justify-center mt-10">
      <iframe
        className="rounded-lg shadow-lg md:w-full h-[300px]"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.2317091353693!2d49.81633713624751!3d34.03691041906387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fecbb006c339845%3A0xbe95dbf2e33e56cb!2z2LTYsdqp2Kog2Kfaqdiz24zYsdiz2KfYstin2YYg2YbZiNin2YbYr9uM2LQg2b7bjNi02LHZiCDZgdmG!5e0!3m2!1sen!2s!4v1741070499256!5m2!1sen!2s&t=k"
      ></iframe>
    </div>
  );
}
