today=$(date +"%y-%m-%d")
folder=./explorer/data/table_exports/$today
mkdir -p $folder
psql -d explorer -a -f ./explorer/scripts/data_export.sql
mv ./explorer/data/table_exports/*.csv $folder/
