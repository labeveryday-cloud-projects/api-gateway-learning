import os
import boto3

transcribe_client = boto3.client('transcribe')

def lambda_handler(event, context):
    bucket_name = os.environ['UPLOAD_BUCKET']
    file_name = event['Records'][0]['s3']['object']['key']
    job_name = f"transcribe_{file_name}"
    
    response = transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': f's3://{bucket_name}/{file_name}'},
        MediaFormat='mp4',
        LanguageCode='en-US',
        OutputBucketName=bucket_name
    )
    
    return response
