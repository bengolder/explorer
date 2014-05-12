from pprint import pprint

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Work,

        WorkType,
        GenericWork,
        PublicationInfo,
        Periodical,
        CourseInfo,
        )

def m2m( fieldA, fieldB, objA, objB ):
    if hasattr( objA, fieldA ):
        data = getattr( objA, fieldA ).all()
        if data:
            for other in data:
                getattr(objB, fieldB).add( other )

def switch( fieldA, fieldB, objA, objB ):
    data = getattr( objA, fieldA )
    if data:
        print data


def pub(obj, ctype):
    work_type, created = WorkType.objects.get_or_create(name=ctype)
    w, created = GenericWork.objects.get_or_create(title=obj.title)
    for field in ['description', 'partners', 'website']:
        if hasattr(obj, field):
            data = getattr( obj, field )
            setattr( w, field, data )
    w.save()
    w.work_types.add(work_type)
    m2m( 'authors', 'faculty', obj, w )
    m2m( 'topics', 'topics', obj, w )
    m2m( 'locations', 'locations', obj, w )
    w.save()
    p = PublicationInfo(work_item=w)
    for field in ['date_published', 'medium']:
        if hasattr(obj, field):
            data = getattr( obj, field )
            setattr( p, field, data )
    p.save()
    m2m( 'publisher', 'publishers', obj, p )
    if hasattr(obj, 'periodical_name'):
        periodical, created = Periodical.objects.get_or_create(name=obj.periodical_name)
        if created:
            print "created", periodical.name
        p.periodicals.add(periodical)
    p.save()
    print 'finished:', w


convert = {
        "publication":"publication",
        "book":"publication",
        "article":"publication",
        "journalarticle":"publication",
        }


def run():
    # we want to transfer all of the works into Generic Work objects
    generics = GenericWork.objects.all()
    num = generics.count()
    generics.delete()
    print "%s generic works deleted" % num
    periodicals = Periodical.objects.all()
    num = periodicals.count()
    periodicals.delete()
    print "%s periodicals deleted" % num
    allWorks = Work.objects.all()
    hist = {}
    for work in allWorks:
        m = ContentType.objects.get( id=work.polymorphic_ctype_id ).model
        pub(work, m)


