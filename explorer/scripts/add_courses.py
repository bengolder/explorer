import requests
from mit.models import Subject, Course, Semester

def getCourses(semester, department):
    url = 'http://coursews.mit.edu/coursews/'
    outpath = '/Users/bgolder/projects/explorer/explorer/data/courses.json'
    term = semester.termParameter()
    params = {
            'term': semester.termParameter(),
            'courses': str(department)
            }
    r = requests.get(url, params=params)
    print "sent get request:", r.url
    return r.json()

def parse_courses(semester, data):
    """What do I need to grab?
        subject:
            course_codes string
            level ('u', 'g', 'h')
            title
            description(optional)
        course:
            instructors: associated faculty
            description
    """
    instructors = {}
    for item in data['items']:
        if item['type'] == 'Class':
            course_id = item['master_subject_id']
            all_ids = item['joint_subjects']
            all_ids.insert(0, course_id)
            course_codes = '/'.join([c for c in all_ids if c])
            season = semester.get_season_display().lower()
            instructor_att = season + '_instructors'
            instructor_strings = item[instructor_att]
            for key in instructor_strings:
                if key not in instructors:
                    instructors[key] = [course_id]
                else:
                    instructors[key].append(course_id)
    for person in instructors:
        if person:
            print person
            print "    %s" % ", ".join(instructors[person])


def run():
    semesters = Semester.objects.all()
    sem = semesters[0]
    courses = getCourses(sem, 11)
    parse_courses(sem, courses)
