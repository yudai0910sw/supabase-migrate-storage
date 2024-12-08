const { createClient } = require('@supabase/supabase-js')

// 旧supabaseのURLとServiceKey
const OLD_PROJECT_URL = '';
const OLD_PROJECT_SERVICE_KEY = '';

// 新supabaseのURLとServiceKey
const NEW_PROJECT_URL = '';
const NEW_PROJECT_SERVICE_KEY = '';

(async () => {
  try {
    const oldSupabaseRestClient = createClient(OLD_PROJECT_URL, OLD_PROJECT_SERVICE_KEY);
    const oldSupabaseClient = createClient(OLD_PROJECT_URL, OLD_PROJECT_SERVICE_KEY);
    const newSupabaseClient = createClient(NEW_PROJECT_URL, NEW_PROJECT_SERVICE_KEY);

    async function listAllObjects(
      client: any,
      bucket: string,
      prefix: string = ''
    ): Promise<any[]> {
      const { data: items, error } = await client.storage.from(bucket).list(prefix);
    
      if (error) {
        throw new Error(`Error listing objects at prefix "${prefix}": ${error.message}`);
      }
    
      let allObjects: any[] = [];
    
      for (const item of items) {
        if (item.id) {
          const objectPath = prefix ? `${prefix}/${item.name}` : item.name;
          allObjects.push({
            ...item,
            path: objectPath
          });
        } else {
          const subdirPrefix = prefix ? `${prefix}/${item.name}` : item.name;
          const subdirObjects = await listAllObjects(client, bucket, subdirPrefix);
          allObjects = allObjects.concat(subdirObjects);
        }
      }
    
      return allObjects;
    }
    
    const oldObjects = await listAllObjects(oldSupabaseRestClient, 'images');

    for (const objectData of oldObjects) {
      console.log(`Moving ${objectData.path}`);
      try {
        const { data: fileData, error: downloadObjectError } = await oldSupabaseClient
          .storage
          .from('images')
          .download(objectData.path);

        if (downloadObjectError) {
          throw new Error(`Download error: ${JSON.stringify(downloadObjectError)}`);
        }

        const { error: uploadObjectError } = await newSupabaseClient
          .storage
          .from('images')
          .upload(objectData.path, fileData, {
            upsert: true,
            contentType: objectData.metadata?.mimetype,
            cacheControl: objectData.metadata?.cacheControl,
          });

        if (uploadObjectError) {
          throw new Error(`Upload error: ${JSON.stringify(uploadObjectError)}`);
        }

      } catch (err) {
        console.error('Error moving object:', objectData.path);
        console.error(err);
      }
    }
  } catch (e) {
    console.error('Top-level error:', e);
    process.exit(1);
  }
})();
