
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  is_first boolean;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1))
  )
  ON CONFLICT (id) DO NOTHING;

  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO is_first;
  IF is_first THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DO $seed$
DECLARE
  v_class_ids uuid[];
  v_subject_ids uuid[];
  v_teacher_ids uuid[];
  v_student_ids uuid[];
  v_subj_id uuid;
  v_score numeric;
  v_grade text;
  v_due numeric;
  v_paid numeric;
  v_status public.fee_status;
  i int;
  j int;
  gender_arr text[] := ARRAY['Male','Female'];
  first_names text[] := ARRAY['Amara','Kwame','Zainab','Tunde','Chiamaka','Oluwaseun','Ifeoma','Emeka','Adaeze','Ngozi','Tariq','Aisha','Bola','Kemi','Yusuf','Ade','Femi','Ngo','Sade','Hassan','Olu','Bisi','Ada','Chinedu','Ibrahim','Fatima','Musa','Halima','Daniel','Grace','Joshua','Mary','Peter','Sarah','David','Esther','John','Ruth','Samuel','Hannah'];
  last_names text[] := ARRAY['Okafor','Mensah','Bello','Adeyemi','Eze','Okonkwo','Lawal','Adebayo','Okoro','Diallo','Nwosu','Mohammed','Abubakar','Yakubu','Sani','Ojo','Ogundipe','Akande','Owusu','Asante'];
  depts text[] := ARRAY['Sciences','Mathematics','Languages','Humanities','Arts','Technology'];
BEGIN
  IF EXISTS (SELECT 1 FROM public.students LIMIT 1) THEN
    RAISE NOTICE 'Already seeded'; RETURN;
  END IF;

  INSERT INTO public.classes (name, level, capacity) VALUES
    ('Grade 7A','Junior Secondary',32),
    ('Grade 8B','Junior Secondary',30),
    ('Grade 9C','Junior Secondary',28),
    ('Grade 10A','Senior Secondary',30),
    ('Grade 11B','Senior Secondary',30),
    ('Grade 12C','Senior Secondary',28);
  SELECT array_agg(id ORDER BY name) INTO v_class_ids FROM public.classes;

  INSERT INTO public.subjects (name, code, department) VALUES
    ('Mathematics','MTH','Mathematics'),
    ('English Language','ENG','Languages'),
    ('Physics','PHY','Sciences'),
    ('Chemistry','CHM','Sciences'),
    ('Biology','BIO','Sciences'),
    ('Further Mathematics','FMT','Mathematics'),
    ('Literature','LIT','Languages'),
    ('French','FRN','Languages'),
    ('History','HIS','Humanities'),
    ('Geography','GEO','Humanities'),
    ('Economics','ECO','Humanities'),
    ('Computer Science','CSC','Technology'),
    ('Visual Arts','ART','Arts'),
    ('Music','MUS','Arts'),
    ('Physical Education','PED','Arts');
  SELECT array_agg(id ORDER BY code) INTO v_subject_ids FROM public.subjects;

  FOR i IN 1..25 LOOP
    INSERT INTO public.teachers (staff_code, full_name, email, phone, department, subjects, hire_date, bio)
    VALUES (
      'TCH' || lpad(i::text, 4, '0'),
      first_names[1 + (i % array_length(first_names,1))] || ' ' || last_names[1 + (i % array_length(last_names,1))],
      'teacher' || i || '@brightfuture.edu',
      '+234-80-' || lpad((1000000 + i)::text, 7, '0'),
      depts[1 + (i % array_length(depts,1))],
      ARRAY[(SELECT code FROM public.subjects ORDER BY code LIMIT 1 OFFSET (i % 15))],
      DATE '2020-01-01' + ((i * 37) % 1500),
      'Experienced educator passionate about student growth.'
    );
  END LOOP;
  SELECT array_agg(id ORDER BY staff_code) INTO v_teacher_ids FROM public.teachers;

  UPDATE public.classes SET homeroom_teacher = v_teacher_ids[1 + (array_position(v_class_ids, id) % array_length(v_teacher_ids,1))];

  FOR i IN 1..100 LOOP
    INSERT INTO public.students (admission_no, full_name, gender, date_of_birth, class_id, guardian_name, guardian_phone, guardian_email, address, enrollment_date)
    VALUES (
      'BFA/' || to_char(CURRENT_DATE,'YYYY') || '/' || lpad(i::text, 4, '0'),
      first_names[1 + (i % array_length(first_names,1))] || ' ' || last_names[1 + ((i*3) % array_length(last_names,1))],
      gender_arr[1 + (i % 2)],
      DATE '2008-01-01' + ((i * 53) % 2000),
      v_class_ids[1 + (i % array_length(v_class_ids,1))],
      'Mr/Mrs ' || last_names[1 + ((i*3) % array_length(last_names,1))],
      '+234-81-' || lpad((2000000 + i)::text, 7, '0'),
      'guardian' || i || '@example.com',
      i || ' BrightFuture Avenue, Lagos',
      DATE '2024-09-01'
    );
  END LOOP;
  SELECT array_agg(id ORDER BY admission_no) INTO v_student_ids FROM public.students;

  FOR i IN 1..array_length(v_student_ids,1) LOOP
    FOR j IN 0..9 LOOP
      INSERT INTO public.attendance (student_id, date, status)
      VALUES (
        v_student_ids[i],
        (CURRENT_DATE - j),
        (CASE WHEN ((i+j) % 17) = 0 THEN 'absent'
              WHEN ((i+j) % 13) = 0 THEN 'late'
              WHEN ((i+j) % 31) = 0 THEN 'excused'
              ELSE 'present' END)::public.attendance_status
      ) ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;

  FOR i IN 1..array_length(v_student_ids,1) LOOP
    FOR j IN 1..6 LOOP
      v_subj_id := v_subject_ids[j];
      v_score := 40 + ((i * 7 + j * 13) % 60);
      v_grade := CASE WHEN v_score >= 75 THEN 'A' WHEN v_score >= 65 THEN 'B' WHEN v_score >= 55 THEN 'C' WHEN v_score >= 45 THEN 'D' ELSE 'F' END;
      INSERT INTO public.results (student_id, subject_id, term, academic_year, score, grade, remarks)
      VALUES (v_student_ids[i], v_subj_id, 'Term 1', '2025/2026', v_score, v_grade,
        CASE WHEN v_score >= 65 THEN 'Excellent progress' WHEN v_score >= 50 THEN 'Good effort' ELSE 'Needs improvement' END)
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;

  FOR i IN 1..array_length(v_student_ids,1) LOOP
    v_due := 250000;
    v_paid := CASE (i % 4) WHEN 0 THEN 0 WHEN 1 THEN 100000 WHEN 2 THEN 250000 ELSE 175000 END;
    v_status := CASE WHEN v_paid = 0 THEN 'unpaid' WHEN v_paid >= v_due THEN 'paid' ELSE 'partial' END;
    INSERT INTO public.fees (student_id, term, academic_year, amount_due, amount_paid, due_date, status)
    VALUES (v_student_ids[i], 'Term 1', '2025/2026', v_due, v_paid, CURRENT_DATE + 30, v_status);
  END LOOP;

  INSERT INTO public.announcements (title, body, audience, published) VALUES
    ('Welcome to the 2025/2026 Academic Year','We are thrilled to welcome all students, parents and staff back to BrightFuture Academy.','all',true),
    ('Mid-term Exams Schedule','Mid-term exams begin October 14. See the dashboard for the full timetable.','students',true),
    ('Parent-Teacher Conference','Scheduled for the last Friday of October. Booking opens next week.','parents',true),
    ('Staff Development Day','School closed to students on November 3 for staff training.','all',true),
    ('Inter-house Sports','Annual sports festival kicks off November 18. Sign-ups now open.','students',true);
END
$seed$;
